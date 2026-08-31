<script setup>
import { ref } from 'vue'

const chipSignatures = new Map([
  [0x2876, { name: 'MT7628', macOffset: 0x04, calStart: 0x20, calEnd: 0x200 }],
  [0x0376, { name: 'MT7603', macOffset: 0x04, calStart: 0x20, calEnd: 0x200 }],
  [0x6276, { name: 'MT7612', macOffset: 0x04, calStart: 0x20, calEnd: 0x200 }],
  [0x6376, { name: 'MT7613', macOffset: 0x04, calStart: 0x20, calEnd: 0x200 }],
  [0x1576, { name: 'MT7615', macOffset: 0x04, calStart: 0x20, calEnd: 0x200 }],
  [0x1579, { name: 'MT7915', macOffset: 0x04, calStart: 0x20, calEnd: 0x200 }],
  [0x8179, { name: 'MT7981', macOffset: 0x04, calStart: 0x20, calEnd: 0x800, factorySize: 0x200000 }],
  [0x9279, { name: 'MT7992', macOffset: 0x04, calStart: 0x20, calEnd: 0x800, factorySize: 0x400000 }]
])

const align4K = 0x1000
const alignSecondary = 0x100
const secondRadioOffset = 0x8000
const secondChipBlockLength = 0x1000

const state = ref('idle')
const error = ref('')
const result = ref(null)
const fileInput = ref(null)
const isDragging = ref(false)

const isValidMac = (data, chipOffset, chipInfo) => {
  const offset = chipOffset + chipInfo.macOffset
  if (offset + 6 > data.length) return false

  const mac = data.subarray(offset, offset + 6)
  return !mac.every((byte) => byte === 0xff) && !mac.every((byte) => byte === 0x00) && !(mac[0] & 0x01)
}

const calculateShannonEntropy = (bytes) => {
  if (!bytes.length) return 0
  const frequencies = new Uint32Array(256)
  bytes.forEach((byte) => frequencies[byte] += 1)

  let entropy = 0
  frequencies.forEach((frequency) => {
    if (frequency) {
      const probability = frequency / bytes.length
      entropy -= probability * Math.log2(probability)
    }
  })
  return entropy
}

const hasCalibrationData = (data, chipOffset, chipInfo) => {
  const start = chipOffset + chipInfo.calStart
  const end = Math.min(chipOffset + chipInfo.calEnd, data.length)
  const span = end - start
  if (span < 64) return false

  let nonEmpty = 0
  let empty = 0
  const unique = new Set()
  for (let index = start; index < end; index += 1) {
    const byte = data[index]
    if (byte === 0xff || byte === 0x00) empty += 1
    else nonEmpty += 1
    unique.add(byte)
  }

  const calibration = data.subarray(start, end)
  return nonEmpty >= 15
    && unique.size >= 6
    && empty / span >= 0.03
    && calculateShannonEntropy(calibration) <= 7.4
}

const hasCleanPrefix = (data, chipOffset, prefixLength = 32, minRatio = 0.9) => {
  if (chipOffset === 0) return true

  const start = Math.max(0, chipOffset - prefixLength)
  const span = chipOffset - start
  if (!span) return false

  let cleanBytes = 0
  for (let index = start; index < chipOffset; index += 1) {
    if (data[index] === 0xff || data[index] === 0x00) cleanBytes += 1
  }
  return cleanBytes / span >= minRatio
}

const isValidChip = (data, offset, chipInfo, requireCleanPrefix) =>
  (!requireCleanPrefix || hasCleanPrefix(data, offset))
  && isValidMac(data, offset, chipInfo)
  && hasCalibrationData(data, offset, chipInfo)

const findPrimaryChips = (data) => {
  const chips = []
  for (let offset = 0; offset < data.length - 1; offset += align4K) {
    const signature = (data[offset] << 8) | data[offset + 1]
    const chipInfo = chipSignatures.get(signature)
    if (chipInfo && isValidChip(data, offset, chipInfo, true)) {
      chips.push({ offset, chipInfo })
    }
  }
  return chips
}

const groupIntoPartitions = (chips, dumpSize) => {
  if (!chips.length) return []

  const defaultFactorySize = dumpSize <= 0x2000000 ? 0x10000 : 0x80000
  const partitions = []
  let current = null

  for (const chip of [...chips].sort((first, second) => first.offset - second.offset)) {
    const factorySize = chip.chipInfo.factorySize || defaultFactorySize
    if (!current || chip.offset >= current.start + current.size) {
      current = { start: chip.offset, size: factorySize, chips: [chip] }
      partitions.push(current)
    } else {
      current.chips.push(chip)
    }
  }
  return partitions
}

const addSecondaryChips = (data, partitions) => {
  partitions.forEach((partition) => {
    const end = Math.min(partition.start + partition.size, data.length)
    const existingOffsets = new Set(partition.chips.map((chip) => chip.offset))

    for (let offset = partition.start + alignSecondary; offset < end - 1; offset += alignSecondary) {
      if (existingOffsets.has(offset)) continue
      const signature = (data[offset] << 8) | data[offset + 1]
      const chipInfo = chipSignatures.get(signature)
      if (chipInfo && isValidChip(data, offset, chipInfo, false)) {
        partition.chips.push({ offset, chipInfo })
        existingOffsets.add(offset)
      }
    }
    partition.chips.sort((first, second) => first.offset - second.offset)
  })
  return partitions
}

const extractPartition = (sourceBuffer, partition) => {
  const source = new Uint8Array(sourceBuffer)
  const output = new Uint8Array(partition.size)
  output.set(source.subarray(partition.start, Math.min(partition.start + partition.size, source.length)))

  if (partition.chips.length >= 2) {
    const secondaryOffset = partition.chips[1].offset - partition.start
    if (secondaryOffset !== secondRadioOffset) {
      const length = Math.min(secondChipBlockLength, partition.size - secondaryOffset, partition.size - secondRadioOffset)
      if (length > 0) {
        output.set(output.subarray(secondaryOffset, secondaryOffset + length), secondRadioOffset)
      }
    }
  }

  return {
    data: new DataView(output.buffer),
    chipNames: partition.chips.map((chip) => chip.chipInfo.name)
  }
}

const meaningfulLength = (bytes) => {
  let index = bytes.length - 1
  while (index >= 0 && (bytes[index] === 0x00 || bytes[index] === 0xff)) index -= 1
  return index + 1
}

const isSameEeprom = (first, second) => {
  const firstLength = meaningfulLength(first)
  const secondLength = meaningfulLength(second)
  if (firstLength !== secondLength) return false

  for (let index = 0; index < firstLength; index += 1) {
    if (first[index] !== second[index]) return false
  }
  return true
}

const deduplicate = (eeproms) => eeproms.filter((eeprom, index) => {
  const current = new Uint8Array(eeprom.data.buffer)
  return !eeproms.slice(0, index).some((previous) => isSameEeprom(current, new Uint8Array(previous.data.buffer)))
})

const download = (data, index, total) => {
  const url = URL.createObjectURL(new Blob([data], { type: 'application/octet-stream' }))
  const link = document.createElement('a')
  link.href = url
  link.download = total > 1 ? `eeprom_${index + 1}.bin` : 'eeprom.bin'
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

const processFile = async (file) => {
  if (!file) return

  state.value = 'processing'
  error.value = ''
  result.value = null

  try {
    await new Promise((resolve) => window.requestAnimationFrame(resolve))
    const buffer = await file.arrayBuffer()
    const data = new Uint8Array(buffer)
    const partitions = addSecondaryChips(data, groupIntoPartitions(findPrimaryChips(data), data.length))
    const eeproms = partitions.map((partition) => extractPartition(buffer, partition))
    const uniqueEeproms = deduplicate(eeproms)

    if (!uniqueEeproms.length) {
      state.value = 'error'
      error.value = 'В файле не найдены подходящие чипы Wi-Fi с данными калибровки.'
      return
    }

    uniqueEeproms.forEach((eeprom, index) => {
      window.setTimeout(() => download(eeprom.data, index, uniqueEeproms.length), index * 500)
    })

    result.value = {
      names: uniqueEeproms.map((eeprom) => eeprom.chipNames.join(' / ')),
      duplicates: eeproms.length - uniqueEeproms.length
    }
    state.value = 'success'
  } catch (exception) {
    state.value = 'error'
    error.value = exception instanceof Error ? exception.message : 'Не удалось обработать дамп.'
  }
}

const openFilePicker = () => fileInput.value?.click()

const handlePicker = (event) => {
  processFile(event.target.files?.[0])
  event.target.value = ''
}

const handleDrop = (event) => {
  isDragging.value = false
  processFile(event.dataTransfer?.files?.[0])
}
</script>

<template>
  <section class="tool-card" aria-label="Извлечь EEPROM из полного дампа">
    <p class="tool-card__description">Загрузите полный дамп, чтобы извлечь один или несколько EEPROM-файлов.</p>

    <div
      class="cutter-dropzone"
      :class="{ 'cutter-dropzone--dragging': isDragging, 'cutter-dropzone--busy': state === 'processing' }"
      role="button"
      tabindex="0"
      :aria-disabled="state === 'processing'"
      @click="state !== 'processing' && openFilePicker()"
      @keydown.enter.prevent="state !== 'processing' && openFilePicker()"
      @keydown.space.prevent="state !== 'processing' && openFilePicker()"
      @dragenter.prevent="isDragging = true"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <input ref="fileInput" class="cutter-dropzone__input" type="file" accept=".bin" @change="handlePicker" />
      <strong>{{ state === 'processing' ? 'Идёт поиск EEPROM…' : 'Перетащите полный дамп сюда' }}</strong>
      <span v-if="state !== 'processing'">или нажмите, чтобы выбрать</span>
    </div>

    <p v-if="state === 'error'" class="tool-message tool-message--error" role="alert">{{ error }}</p>
    <div v-if="state === 'success' && result" class="tool-message tool-message--success">
      <p>Найдено EEPROM: {{ result.names.length }}.</p>
      <ul>
        <li v-for="(name, index) in result.names" :key="`${name}-${index}`">
          <code>{{ result.names.length > 1 ? `eeprom_${index + 1}.bin` : 'eeprom.bin' }}</code>: {{ name }}
        </li>
      </ul>
      <p v-if="result.duplicates">Пропущено дубликатов: {{ result.duplicates }}.</p>
    </div>
  </section>
</template>

<style scoped>
.tool-warning {
  margin: 0 0 22px;
  color: var(--vp-c-danger-1);
}

.tool-message p {
  margin: 0;
}

.tool-message p + p,
.tool-message ul {
  margin-top: 10px;
}

</style>
