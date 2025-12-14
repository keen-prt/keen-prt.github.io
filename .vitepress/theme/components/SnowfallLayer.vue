<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useSnowfall } from '../snowfall'

const { enabled } = useSnowfall()

const hydrated = ref(false)
const flakes = ref([])

function buildFlakes() {
  const list = []
  const count =
    typeof window !== 'undefined' && window.matchMedia?.('(max-width: 768px)')?.matches ? 12 : 30
  for (let id = 0; id < count; id++) {
    const duration = 8 + Math.random() * 12
    list.push({
      id,
      left: Math.random() * 100,
      duration,
      delay: Math.random() * -20,
      size: 12 + Math.random() * 14,
      opacity: 0.4 + Math.random() * 0.6,
      sway: 10 + Math.random() * 30
    })
  }
  flakes.value = list
}

const show = computed(() => hydrated.value && enabled.value)

onMounted(() => {
  hydrated.value = true
  if (enabled.value) buildFlakes()
})

watch(
  enabled,
  (v) => {
    if (v && flakes.value.length === 0) buildFlakes()
  },
  { flush: 'post' }
)
</script>

<template>
  <Transition name="snowfall-fade">
    <div v-if="show" class="snowfall" aria-hidden="true">
      <div
        v-for="f in flakes"
        :key="f.id"
        class="snowfall__flake"
        :style="{
          left: `${f.left}%`,
          '--snowfall-size': `${f.size}px`,
          '--snowfall-opacity': f.opacity,
          '--snowfall-sway': `${f.sway}px`,
          animationDuration: `${f.duration}s`,
          animationDelay: `${f.delay}s`
        }"
      >
        <span class="snowfall__glyph" aria-hidden="true">❅</span>
      </div>
    </div>
  </Transition>
</template>


