<script setup>
import { ref, onMounted } from 'vue'

const config = ref(null)
const isVisible = ref(false)

onMounted(async () => {
  try {
    const res = await fetch('https://osvault.keeneticported.dev/files/image.json')
    if (!res.ok) return
    const data = await res.json()
    if (!data.enabled || !data.image) return

    config.value = data

    const img = new Image()
    img.onload = () => { isVisible.value = true }
    img.onerror = () => { isVisible.value = false }
    img.src = data.image
  } catch {
  }
})
</script>

<template>
  <div v-if="isVisible" class="aside-block">
    <a :href="config.link" target="_blank" rel="noopener">
      <img
        :src="config.image"
        class="aside-block-img"
        alt=""
      />
    </a>
  </div>
</template>