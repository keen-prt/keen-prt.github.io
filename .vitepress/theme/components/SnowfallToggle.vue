<script setup>
import { computed, onMounted, ref } from 'vue'
import { useSnowfall, isWinterPeriod } from '../snowfall'

const { enabled, toggle } = useSnowfall()
const ariaLabel = computed(() => (enabled.value ? 'Выключить' : 'Включить'))
const showToggle = ref(false)

onMounted(() => {
  showToggle.value = isWinterPeriod()
})
</script>

<template>
  <button
    v-if="showToggle"
    class="snowfall-toggle"
    type="button"
    :aria-pressed="enabled"
    :aria-label="ariaLabel"
    @click="toggle"
  >
    <span class="snowfall-toggle__icon" aria-hidden="true">❄</span>
  </button>
</template>


