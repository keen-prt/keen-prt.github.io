<script setup>
import { ref } from 'vue'

const presets = {
  smartbox: { src: '0x8000', dst: '0x0', length: '3000' },
  xiaomi: { src: '0x8000', dst: '0x400', length: '600' }
}

const preset = ref('')
const sourceOffset = ref('')
const destinationOffset = ref('')
const length = ref('')
const step = ref('settings')
const error = ref('')
const success = ref(false)

const parseHex = (value) => {
  const normalized = value.trim().replace(/^0x/i, '')
  if (!/^[0-9a-f]+$/i.test(normalized)) return Number.NaN
  return Number.parseInt(normalized, 16)
}

const applyPreset = () => {
  const selectedPreset = presets[preset.value]
  if (!selectedPreset) return

  sourceOffset.value = selectedPreset.src
  destinationOffset.value = selectedPreset.dst
  length.value = selectedPreset.length
}

const getSettings = () => ({
  source: parseHex(sourceOffset.value),
  destination: parseHex(destinationOffset.value),
  length: parseHex(length.value)
})

const validateSettings = (settings) =>
  Number.isInteger(settings.source)
  && Number.isInteger(settings.destination)
  && Number.isInteger(settings.length)
  && settings.source >= 0
  && settings.destination >= 0
  && settings.length > 0

const continueToFile = () => {
  const settings = getSettings()
  if (!validateSettings(settings)) {
    error.value = 'Проверьте смещения и длину: значения указываются в шестнадцатеричном формате.'
    return
  }

  error.value = ''
  success.value = false
  step.value = 'file'
}

const reset = () => {
  step.value = 'settings'
  error.value = ''
  success.value = false
}

const download = (buffer, fileName) => {
  const url = URL.createObjectURL(new Blob([buffer], { type: 'application/octet-stream' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `patched_${fileName}`
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

const handleFile = async (event) => {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (!file) return

  const settings = getSettings()
  if (!validateSettings(settings)) {
    step.value = 'settings'
    error.value = 'Параметры больше невалидны. Проверьте их ещё раз.'
    return
  }

  try {
    const buffer = await file.arrayBuffer()
    const dataView = new DataView(buffer)
    if (settings.source + settings.length > dataView.byteLength || settings.destination + settings.length > dataView.byteLength) {
      throw new Error('Смещения и длина выходят за пределы выбранного файла.')
    }

    for (let index = 0; index < settings.length; index += 1) {
      dataView.setUint8(settings.destination + index, dataView.getUint8(settings.source + index))
    }

    download(buffer, file.name)
    success.value = true
    error.value = ''
  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : 'Не удалось обработать файл.'
    success.value = false
  }
}
</script>

<template>
  <section class="tool-card" aria-label="Перемещение калибровки EEPROM">
    <p class="tool-card__description">Настройте копирование участка калибровки в другую область EEPROM.</p>

    <form v-if="step === 'settings'" class="tool-form" @submit.prevent="continueToFile">
      <label class="tool-form__label" for="mover-preset">Пресет</label>
      <select id="mover-preset" v-model="preset" class="tool-form__input" @change="applyPreset">
        <option value="">—</option>
        <option value="smartbox">SmartBox Turbo+</option>
        <option value="xiaomi">Xiaomi Extender RC04</option>
      </select>

      <div class="tool-form__grid">
        <label class="tool-form__field" for="source-offset">
          Откуда копировать
          <input id="source-offset" v-model="sourceOffset" class="tool-form__input" type="text" placeholder="0x8000" />
        </label>
        <label class="tool-form__field" for="destination-offset">
          Куда вставлять
          <input id="destination-offset" v-model="destinationOffset" class="tool-form__input" type="text" placeholder="0x400" />
        </label>
        <label class="tool-form__field" for="copy-length">
          Длина
          <input id="copy-length" v-model="length" class="tool-form__input" type="text" placeholder="600" />
        </label>
      </div>
      <p class="tool-form__hint">Все значения интерпретируются как HEX: <code>600</code> означает <code>0x600</code>.</p>
      <button class="tool-button" type="submit">Продолжить</button>
    </form>

    <div v-else class="tool-form">
      <p class="tool-form__selected">Параметры приняты. Выберите EEPROM-файл для обработки.</p>
      <label class="tool-button tool-button--file" for="mover-file">
        Выбрать EEPROM-файл
        <input id="mover-file" type="file" @change="handleFile" />
      </label>
      <button class="tool-button tool-button--secondary" type="button" @click="reset">Изменить параметры</button>
    </div>

    <p v-if="error" class="tool-message tool-message--error" role="alert">{{ error }}</p>
    <p v-if="success" class="tool-message tool-message--success">Файл обработан и скачан.</p>
  </section>
</template>

<style scoped>
.tool-form {
  max-width: 760px;
}

.tool-form__label,
.tool-form__field {
  display: grid;
  gap: 6px;
  font-weight: 600;
}

.tool-form__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.tool-form__hint,
.tool-form__selected {
  margin: 0;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .tool-form__grid {
    grid-template-columns: 1fr;
  }
}
</style>
