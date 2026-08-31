<script setup>
import { ref } from 'vue'

const macInput = ref('')
const macAddress = ref('')
const step = ref('mac')
const error = ref('')
const success = ref(false)

const mt7615 = [0x15, 0x76]
const mt7612 = [0x12, 0x76]
const mt7603 = [0x03, 0x76]
const encryptedPrefixes = [[0xaa ^ 0xaa, 0xbb ^ 0xcc, 0xaa ^ 0xdd]]
const xorKey = 0xbf

const encryptPrefix = (plainArray) => plainArray.map((byte) => byte ^ xorKey)

const startPatching = () => {
  const normalizedMac = macInput.value.replace(/[:\s]/g, '').toUpperCase()

  if (!/^[0-9A-F]{12}$/.test(normalizedMac)) {
    error.value = 'Введите MAC-адрес из 12 шестнадцатеричных символов.'
    success.value = false
    return
  }

  macAddress.value = normalizedMac
  error.value = ''
  success.value = false
  step.value = 'file'
}

const reset = () => {
  step.value = 'mac'
  error.value = ''
  success.value = false
}

const writeMac = (dataView, offset, bytes) => {
  if (offset < 0 || offset + bytes.length > dataView.byteLength) {
    throw new Error(`Нужная область EEPROM по смещению 0x${offset.toString(16)} отсутствует в файле.`)
  }

  bytes.forEach((byte, index) => dataView.setUint8(offset + index, byte))
}

const download = (buffer) => {
  const blob = new Blob([buffer], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'eeprom.bin'
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

const handleFile = async (event) => {
  const file = event.target.files?.[0]
  event.target.value = ''

  if (!file) return

  try {
    const arrayBuffer = await file.arrayBuffer()
    const dataView = new DataView(arrayBuffer)

    if (dataView.byteLength < 2) {
      throw new Error('Выбранный файл слишком мал для EEPROM.')
    }

    const macBytes = new Uint8Array(6)
    for (let index = 0; index < macBytes.length; index += 1) {
      macBytes[index] = Number.parseInt(macAddress.value.slice(index * 2, index * 2 + 2), 16)
    }

    const encryptedMacPrefix = encryptPrefix([
      macBytes[0],
      macBytes[1],
      macBytes[2]
    ])
    const isEncrypted = encryptedPrefixes.some((prefix) =>
      prefix.every((byte, index) => byte === encryptedMacPrefix[index])
    )

    let specificOffset = null
    let is7615 = false
    let is7612 = false
    let is7603 = false
    let is7915 = false

    if (isEncrypted) {
      for (let index = 2; index < dataView.byteLength; index += 1) {
        dataView.setUint8(index, 0xff)
      }
      specificOffset = 0x0a
    } else if (dataView.getUint8(0) === 0x81 && dataView.getUint8(1) === 0x79) {
      specificOffset = 0x04
    } else if (dataView.getUint8(0) === 0x86 && dataView.getUint8(1) === 0x79) {
      specificOffset = 0x04
    } else if (dataView.getUint8(0) === 0x15 && dataView.getUint8(1) === 0x79) {
      is7915 = true
    } else {
      for (let index = 0; index < dataView.byteLength - 1; index += 1) {
        const firstByte = dataView.getUint8(index)
        const secondByte = dataView.getUint8(index + 1)
        is7615 ||= firstByte === mt7615[0] && secondByte === mt7615[1]
        is7612 ||= firstByte === mt7612[0] && secondByte === mt7612[1]
        is7603 ||= firstByte === mt7603[0] && secondByte === mt7603[1]
      }
    }

    if (specificOffset !== null) {
      writeMac(dataView, specificOffset, macBytes)
    } else {
      const offsets = [
        { offset: 0x28, delta: 0 },
        { offset: 0x04, delta: -1 }
      ]

      if (is7915) {
        offsets.splice(0, offsets.length, { offset: 0x0a, delta: 0 }, { offset: 0x04, delta: -1 })
      } else if (is7612 && is7603) {
        offsets.splice(
          0,
          offsets.length,
          { offset: 0x04, delta: 0 },
          { offset: 0x28, delta: 1 },
          { offset: 0x8004, delta: 2 }
        )
      } else if (!is7615) {
        offsets.push({ offset: 0x8004, delta: 1 })
      }

      offsets.forEach(({ offset, delta }) => {
        const adjustedMac = Uint8Array.from(macBytes)
        adjustedMac[adjustedMac.length - 1] = (adjustedMac[adjustedMac.length - 1] + delta) & 0xff
        writeMac(dataView, offset, adjustedMac)
      })
    }

    const maxSize = 0x80000
    download(arrayBuffer.byteLength > maxSize ? arrayBuffer.slice(0, maxSize) : arrayBuffer)
    success.value = true
    error.value = ''
  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : 'Не удалось обработать файл.'
    success.value = false
  }
}
</script>

<template>
  <section class="tool-card" aria-label="Внести MAC-адрес">
    <p class="tool-card__description">Укажите MAC-адрес, затем загрузите EEPROM — готовый файл будет скачан автоматически.</p>

    <form v-if="step === 'mac'" class="tool-form" @submit.prevent="startPatching">
      <label class="tool-form__label" for="mac-address">MAC-адрес роутера</label>
      <input
        id="mac-address"
        v-model="macInput"
        class="tool-form__input"
        type="text"
        inputmode="text"
        autocomplete="off"
        placeholder="AA:BB:CC:DD:EE:FF"
      />
      <details class="tool-form__details">
        <summary>Как вводить MAC-адрес?</summary>
        <p>Подойдут варианты <code>AABBCCDDEEFF</code> и <code>AA:BB:CC:DD:EE:FF</code>.</p>
      </details>
      <button class="tool-button" type="submit">Продолжить</button>
    </form>

    <div v-else class="tool-form">
      <p class="tool-form__selected-mac">MAC-адрес: <code>{{ macAddress }}</code></p>
      <label class="tool-button tool-button--file" for="converter-file">
        Выбрать EEPROM-файл
        <input id="converter-file" type="file" accept=".bin" @change="handleFile" />
      </label>
      <button class="tool-button tool-button--secondary" type="button" @click="reset">Изменить MAC</button>
    </div>

    <p v-if="error" class="tool-message tool-message--error" role="alert">{{ error }}</p>
    <p v-if="success" class="tool-message tool-message--success">
      EEPROM обработан и скачан как <code>eeprom.bin</code>.
    </p>
  </section>
</template>

<style scoped>
.tool-form {
  max-width: 520px;
}

.tool-form__label,
.tool-form__selected-mac {
  margin: 0;
  font-weight: 600;
}

.tool-form__details {
  color: var(--vp-c-text-2);
}

.tool-form__details p {
  margin-bottom: 0;
}

</style>
