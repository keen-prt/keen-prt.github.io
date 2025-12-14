<script setup>
import { computed } from 'vue'
import { useSnowfall } from '../snowfall'

const { enabled, toggle } = useSnowfall()
const ariaLabel = computed(() => (enabled.value ? 'Выключить' : 'Включить'))
</script>

<template>
  <button
    class="snowfall-toggle"
    type="button"
    :aria-pressed="enabled"
    :aria-label="ariaLabel"
    @click="toggle"
  >
    <span class="snowfall-toggle__icon" aria-hidden="true">❄</span>
  </button>
</template>


