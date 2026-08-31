<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const encoder = new TextEncoder()
const decoder = new TextDecoder()
const digits = '0123456789'
const lettersAndDigits = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const templateDirectory = `${import.meta.env.BASE_URL}assets/files/uconfig/`

const fileInput = ref(null)
const isDragging = ref(false)
const sourceMode = ref('template')
const state = ref('idle')
const error = ref('')
const result = ref(null)
const templates = ref([])
const templatesState = ref('loading')
const templatesError = ref('')
const selectedTemplateFile = ref('')
const templatePicker = ref(null)
const isTemplateMenuOpen = ref(false)

const isProcessing = computed(() => state.value === 'processing')
const selectedTemplate = computed(() =>
  templates.value.find((template) => template.file === selectedTemplateFile.value)
)
const selectedTemplateName = computed(() => selectedTemplate.value?.name ?? 'Выберите модель')

const randomString = (length, characters) => {
  const randomValues = new Uint32Array(length)
  crypto.getRandomValues(randomValues)
  return Array.from(randomValues, (value) => characters[value % characters.length]).join('')
}

const findNullTerminatedValues = (data, field) => {
  const fieldBytes = encoder.encode(field)
  const values = []

  for (let index = 0; index <= data.length - fieldBytes.length; index += 1) {
    if (!fieldBytes.every((byte, fieldIndex) => data[index + fieldIndex] === byte)) continue

    const start = index + fieldBytes.length
    let end = start
    while (end < data.length && data[end] !== 0) end += 1
    if (end < data.length) {
      values.push({ start, end, value: data.slice(start, end) })
    }
  }

  return values
}

const replaceValues = (data, field, createValue) => {
  const matches = findNullTerminatedValues(data, field)
  if (!matches.length) return { count: 0, value: null }

  const valueLength = matches[0].value.length
  if (matches.some((match) => match.value.length !== valueLength)) {
    throw new Error(`Поле ${field} найдено с разной длиной значений.`)
  }

  const replacement = encoder.encode(createValue(matches[0].value))
  if (replacement.length !== valueLength) {
    throw new Error(`Новое значение ${field} не совпадает по длине с исходным.`)
  }

  matches.forEach((match) => data.set(replacement, match.start))
  return { count: matches.length, value: decoder.decode(replacement) }
}

const download = (data, fileName) => {
  const url = URL.createObjectURL(new Blob([data], { type: 'application/octet-stream' }))
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

const outputName = (fileName, serviceTag) => {
  const extensionIndex = fileName.lastIndexOf('.')
  const base = extensionIndex > 0 ? fileName.slice(0, extensionIndex) : fileName
  const extension = extensionIndex > 0 ? fileName.slice(extensionIndex) : ''
  const suffix = serviceTag?.slice(-4) || 'XXXX'
  return `${base}_${suffix}${extension}`
}

const patchData = (data, fileName) => {
  const serviceTag = replaceValues(data, 'servicetag=', (value) => randomString(value.length, digits))
  const serialNumber = replaceValues(data, 'sernumb=', (value) => {
    const stablePartLength = Math.max(0, value.length - 4)
    return decoder.decode(value.slice(0, stablePartLength)) + randomString(value.length - stablePartLength, digits)
  })
  const servicePassword = replaceValues(data, 'servicepass=', (value) => randomString(value.length, lettersAndDigits))
  const country = replaceValues(data, 'country=', (value) => {
    if (value.length !== 2) {
      throw new Error('Поле country имеет неожиданную длину.')
    }
    return 'EA'
  })

  const replacements = [serviceTag, serialNumber, servicePassword, country]
  const changedFields = replacements.reduce((count, replacement) => count + replacement.count, 0)
  if (!changedFields) {
    throw new Error('В файле не найдены сервисные поля U-Config.')
  }

  const name = outputName(fileName, serviceTag.value)
  download(data, name)
  return { name, changedFields }
}

const processData = async (loadData, fileName) => {
  if (isProcessing.value) return

  state.value = 'processing'
  error.value = ''
  result.value = null

  try {
    await new Promise((resolve) => window.requestAnimationFrame(resolve))
    const rawData = await loadData()
    const data = new Uint8Array(rawData)
    result.value = patchData(data, fileName)
    state.value = 'success'
  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : 'Не удалось обработать U-Config.'
    state.value = 'error'
  }
}

const loadTemplates = async () => {
  templatesState.value = 'loading'
  templatesError.value = ''

  try {
    const response = await fetch(`${templateDirectory}index.json`)
    if (!response.ok) {
      throw new Error(`Не удалось загрузить список шаблонов: ${response.status}.`)
    }

    const data = await response.json()
    if (!Array.isArray(data)) {
      throw new Error('Список шаблонов имеет неверный формат.')
    }

    templates.value = data.filter((template) =>
      template
      && typeof template.name === 'string'
      && typeof template.file === 'string'
      && template.file.toLowerCase().endsWith('.bin')
    )
    templatesState.value = 'ready'
  } catch (exception) {
    templatesError.value = exception instanceof Error ? exception.message : 'Не удалось загрузить список шаблонов.'
    templatesState.value = 'error'
  }
}

const closeTemplateMenu = () => {
  isTemplateMenuOpen.value = false
}

const toggleTemplateMenu = () => {
  if (isProcessing.value) return
  isTemplateMenuOpen.value = !isTemplateMenuOpen.value
}

const chooseTemplate = (template) => {
  selectedTemplateFile.value = template.file
  closeTemplateMenu()
}

const handleDocumentClick = (event) => {
  if (templatePicker.value && !templatePicker.value.contains(event.target)) {
    closeTemplateMenu()
  }
}

const selectSource = (mode) => {
  sourceMode.value = mode
  closeTemplateMenu()
  state.value = 'idle'
  error.value = ''
  result.value = null
}

const openFilePicker = () => fileInput.value?.click()

const handlePicker = (event) => {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (file) processData(() => file.arrayBuffer(), file.name)
}

const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) processData(() => file.arrayBuffer(), file.name)
}

const processSelectedTemplate = () => {
  const template = selectedTemplate.value
  if (!template) {
    error.value = 'Выберите модель из списка.'
    state.value = 'error'
    return
  }

  processData(async () => {
    const response = await fetch(`${templateDirectory}${encodeURIComponent(template.file)}`)
    if (!response.ok) {
      throw new Error(`Не удалось скачать U-Config для ${template.name}: ${response.status}.`)
    }
    return response.arrayBuffer()
  }, template.file)
}

onMounted(() => {
  loadTemplates()
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => document.removeEventListener('click', handleDocumentClick))
</script>

<template>
  <section class="uconfig-tool" aria-label="Генератор U-Config">
    <p class="uconfig-tool__description">
      Генерирует уникальные сервисные данные.
    </p>

    <div class="uconfig-source" role="tablist" aria-label="Источник U-Config">
      <button
        class="uconfig-source__button"
        :class="{ 'uconfig-source__button--active': sourceMode === 'template' }"
        type="button"
        role="tab"
        :aria-selected="sourceMode === 'template'"
        @click="selectSource('template')"
      >
        Скачать готовый
      </button>    
      <button
        class="uconfig-source__button"
        :class="{ 'uconfig-source__button--active': sourceMode === 'own' }"
        type="button"
        role="tab"
        :aria-selected="sourceMode === 'own'"
        @click="selectSource('own')"
      >
        Загрузить свой файл
      </button>
    </div>

    <div
      v-if="sourceMode === 'own'"
      class="uconfig-dropzone"
      :class="{ 'uconfig-dropzone--dragging': isDragging, 'uconfig-dropzone--busy': isProcessing }"
      role="button"
      tabindex="0"
      :aria-disabled="isProcessing"
      @click="!isProcessing && openFilePicker()"
      @keydown.enter.prevent="!isProcessing && openFilePicker()"
      @keydown.space.prevent="!isProcessing && openFilePicker()"
      @dragenter.prevent="isDragging = true"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <input ref="fileInput" class="uconfig-dropzone__input" type="file" @change="handlePicker" />
      <strong>{{ isProcessing ? 'Обработка U-Config…' : 'Перетащите файл сюда' }}</strong>
      <span v-if="!isProcessing">или нажмите, чтобы выбрать</span>
    </div>

    <div v-else class="uconfig-template">
      <p class="uconfig-template__description">
        Выберите модель — его U-Config будет сгенерирован новыми данными.
      </p>

      <p v-if="templatesState === 'loading'" class="uconfig-template__status">Загружаем список моделей…</p>
      <template v-else-if="templatesState === 'ready'">
        <p v-if="!templates.length" class="uconfig-template__status">
          В папке шаблонов пока нет файлов <code>.bin</code>.
        </p>
        <template v-else>
          <div class="uconfig-template__field">
            <div
              ref="templatePicker"
              class="uconfig-combobox"
              @keydown.escape.prevent="closeTemplateMenu"
            >
              <button
                id="uconfig-template"
                class="uconfig-combobox__trigger"
                type="button"
                aria-haspopup="listbox"
                aria-controls="uconfig-template-list"
                :aria-expanded="isTemplateMenuOpen"
                :disabled="isProcessing"
                @click="toggleTemplateMenu"
              >
                <span>{{ selectedTemplateName }}</span>
                <span class="uconfig-combobox__chevron" aria-hidden="true">⌄</span>
              </button>
              <div v-if="isTemplateMenuOpen" class="uconfig-combobox__menu">
                <div id="uconfig-template-list" class="uconfig-combobox__options" role="listbox">
                  <button
                    v-for="template in templates"
                    :key="template.file"
                    class="uconfig-combobox__option"
                    :class="{ 'uconfig-combobox__option--selected': template.file === selectedTemplateFile }"
                    type="button"
                    role="option"
                    :aria-selected="template.file === selectedTemplateFile"
                    @click="chooseTemplate(template)"
                  >
                    {{ template.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            class="uconfig-template__button"
            type="button"
            :disabled="!selectedTemplate || isProcessing"
            @click="processSelectedTemplate"
          >
            {{ isProcessing ? 'Подготовка U-Config…' : 'Подготовить и скачать U-Config' }}
          </button>
        </template>
      </template>
      <p v-else class="uconfig-template__status uconfig-template__status--error" role="alert">
        {{ templatesError }}
        <button class="uconfig-template__retry" type="button" @click="loadTemplates">Повторить</button>
      </p>
    </div>

    <p v-if="state === 'error'" class="uconfig-message uconfig-message--error" role="alert">{{ error }}</p>
    <p v-if="state === 'success' && result" class="uconfig-message uconfig-message--success">
      Обновлено сервисных полей: {{ result.changedFields }}. Файл скачан как <code>{{ result.name }}</code>.
    </p>
  </section>
</template>

<style scoped>
.uconfig-tool {
  padding: clamp(20px, 4vw, 36px);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.uconfig-tool__description {
  margin: 0 0 20px;
  color: var(--vp-c-text-2);
}

.uconfig-source {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.uconfig-source__button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: 0.15s ease;
}

.uconfig-source__button:hover,
.uconfig-source__button--active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.uconfig-source__button:focus-visible,
.uconfig-template__button:focus-visible,
.uconfig-template__retry:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.uconfig-dropzone {
  display: grid;
  place-items: center;
  align-content: center;
  gap: 4px;
  min-height: 190px;
  box-sizing: border-box;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  color: var(--vp-c-text-2);
  text-align: center;
  cursor: pointer;
  transition: 0.15s ease;
}

.uconfig-dropzone:hover,
.uconfig-dropzone--dragging {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-text-1);
}

.uconfig-dropzone--busy {
  cursor: wait;
  opacity: 0.75;
}

.uconfig-dropzone:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.uconfig-dropzone__input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.uconfig-template {
  display: grid;
  gap: 16px;
  min-height: 190px;
  box-sizing: border-box;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
}

.uconfig-template__description,
.uconfig-template__status {
  margin: 0;
  color: var(--vp-c-text-2);
}

.uconfig-template__field {
  display: grid;
  gap: 6px;
  max-width: 440px;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.uconfig-combobox {
  position: relative;
  font-weight: 400;
}

.uconfig-combobox__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px 12px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.uconfig-combobox__trigger:hover:not(:disabled),
.uconfig-combobox__trigger[aria-expanded='true'] {
  border-color: var(--vp-c-brand-1);
}

.uconfig-combobox__trigger:focus-visible,
.uconfig-combobox__option:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.uconfig-combobox__trigger:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.uconfig-combobox__chevron {
  margin-left: 12px;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  line-height: 1;
}

.uconfig-combobox__menu {
  position: absolute;
  z-index: 1;
  top: calc(100% + 6px);
  right: 0;
  left: 0;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-3);
}

.uconfig-combobox__options {
  display: grid;
  max-height: 220px;
  overflow-y: auto;
  padding: 4px;
}

.uconfig-combobox__option {
  width: 100%;
  border: 0;
  border-radius: 6px;
  padding: 8px;
  color: var(--vp-c-text-1);
  background: transparent;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.uconfig-combobox__option:hover,
.uconfig-combobox__option--selected {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.uconfig-template__button {
  justify-self: start;
  border: 1px solid var(--vp-button-brand-border);
  border-radius: 20px;
  padding: 0 20px;
  color: var(--vp-button-brand-text);
  background: var(--vp-button-brand-bg);
  font-size: 14px;
  font-weight: 600;
  line-height: 38px;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
}

.uconfig-template__button:hover:not(:disabled) {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background: var(--vp-button-brand-hover-bg);
}

.uconfig-template__button:active:not(:disabled) {
  border-color: var(--vp-button-brand-active-border);
  color: var(--vp-button-brand-active-text);
  background: var(--vp-button-brand-active-bg);
  transition-duration: 0.1s;
}

.uconfig-template__button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.uconfig-template__status--error {
  color: var(--vp-c-danger-1);
}

.uconfig-template__retry {
  margin-left: 8px;
  border: 0;
  padding: 0;
  color: var(--vp-c-brand-1);
  background: transparent;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
}

.uconfig-message {
  margin: 20px 0 0;
  border-radius: 8px;
  padding: 12px 14px;
}

.uconfig-message--error {
  color: var(--vp-c-danger-1);
  background: var(--vp-c-danger-soft);
}

.uconfig-message--success {
  color: var(--vp-c-green-1);
  background: var(--vp-c-green-soft);
}

@media (max-width: 640px) {
  .uconfig-template__button {
    padding: 0 14px;
    font-size: 12px;
    line-height: 36px;
  }
}
</style>
