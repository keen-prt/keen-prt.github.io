<script setup>
import { ref, onBeforeUnmount, onMounted, nextTick } from 'vue'

const props = defineProps({
  placement: {
    type: String,
    default: 'both',
  },
})

const config = ref(null)
const isDesktopVisible = ref(false)
const isMobileVisible = ref(false)
const mobileBanner = ref(null)
let mobileBannerObserver

const updateMobileBannerOffset = () => {
  const height = mobileBanner.value?.offsetHeight ?? 0
  document.documentElement.style.setProperty('--kp-mobile-banner-height', `${height}px`)
}

const showMobileBanner = async () => {
  isMobileVisible.value = true
  await nextTick()

  updateMobileBannerOffset()
  mobileBannerObserver = new ResizeObserver(updateMobileBannerOffset)
  mobileBannerObserver.observe(mobileBanner.value)
}

const loadImage = (src, onLoad) => {
  if (!src) return

  const img = new Image()
  img.onload = onLoad
  img.src = src
}

onMounted(async () => {
  try {
    const res = await fetch('https://osvault.keeneticported.dev/files/image.json')
    if (!res.ok) return
    const data = await res.json()
    if (!data.enabled || (!data.image && !data.image_mobile)) return

    config.value = data

    if (props.placement !== 'mobile') {
      loadImage(data.image, () => { isDesktopVisible.value = true })
    }
    if (props.placement !== 'desktop') {
      loadImage(data.image_mobile, showMobileBanner)
    }
  } catch {
  }
})

onBeforeUnmount(() => {
  mobileBannerObserver?.disconnect()
  document.documentElement.style.removeProperty('--kp-mobile-banner-height')
})
</script>

<template>
  <div v-if="isDesktopVisible && placement !== 'mobile'" class="aside-block">
    <a :href="config.link" target="_blank" rel="noopener">
      <img
        :src="config.image"
        class="aside-block-img"
        alt=""
      />
    </a>
  </div>

  <div
    v-if="isMobileVisible && placement !== 'desktop'"
    ref="mobileBanner"
    class="mobile-banner"
  >
    <a :href="config.link" target="_blank" rel="noopener">
      <img :src="config.image_mobile" class="mobile-banner-img" alt="" />
    </a>
  </div>
</template>
