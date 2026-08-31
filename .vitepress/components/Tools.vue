<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import './tools/shared.css'
import EepromConverter from './tools/EepromConverter.vue'
import EepromCutter from './tools/EepromCutter.vue'
import EepromMover from './tools/EepromMover.vue'
import UConfigGenerator from './tools/UConfigGenerator.vue'

const tabs = [
  { id: 'converter', label: 'Внести MAC', component: EepromConverter },
  { id: 'mover', label: 'EEPROM Mover', component: EepromMover },
  { id: 'cutter', label: 'Извлечь EEPROM', component: EepromCutter },
  { id: 'uconfig', label: 'U-Config', component: UConfigGenerator }
]

const activeTool = ref('converter')
const activeComponent = computed(
  () => tabs.find((tab) => tab.id === activeTool.value)?.component ?? EepromConverter
)

const selectTool = (tool) => {
  activeTool.value = tool
  window.history.replaceState(null, '', `#${tool}`)
}

const syncToolWithHash = () => {
  const tool = window.location.hash.slice(1)
  if (tabs.some((tab) => tab.id === tool)) {
    activeTool.value = tool
  }
}

onMounted(() => {
  syncToolWithHash()
  window.addEventListener('hashchange', syncToolWithHash)
})

onBeforeUnmount(() => window.removeEventListener('hashchange', syncToolWithHash))
</script>

<template>
  <section class="eeprom-tools" aria-label="EEPROM-инструменты">
    <p class="eeprom-tools__notice">
      Все операции выполняются локально в браузере: файлы никуда не загружаются.
    </p>

    <div class="eeprom-tools__tabs" role="tablist" aria-label="Выбор EEPROM-инструмента">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="eeprom-tools__tab"
        :class="{ 'eeprom-tools__tab--active': activeTool === tab.id }"
        type="button"
        role="tab"
        :aria-selected="activeTool === tab.id"
        @click="selectTool(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>

    <component :is="activeComponent" :key="activeTool" />
  </section>
</template>

<style scoped>
.eeprom-tools {
  margin: 24px 0;
}

.eeprom-tools__notice {
  margin-bottom: 16px;
  color: var(--vp-c-text-2);
}

.eeprom-tools__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.eeprom-tools__tab {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: 0.15s ease;
}

.eeprom-tools__tab:hover,
.eeprom-tools__tab--active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.eeprom-tools__tab:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
</style>
