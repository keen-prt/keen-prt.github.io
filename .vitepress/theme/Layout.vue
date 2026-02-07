<script setup>
import DefaultTheme from 'vitepress/theme'
import { computed, onMounted } from 'vue'
import { useRouter, useData } from 'vitepress'
import mediumZoom from 'medium-zoom'
import Snowfall from './components/Snowfall.vue'
import NavBarLogo from './components/NavBarLogo.vue'
import Banner from '../components/Banner.vue'

const { Layout: DefaultLayout } = DefaultTheme
const router = useRouter()
const { site } = useData()
const showBanner = computed(() => site.value.themeConfig?.showBanner !== false)

const setupLightbox = () => {
  mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' })
}

onMounted(setupLightbox)
router.onAfterRouteChange = setupLightbox
</script>

<template>
  <DefaultLayout>
    <template #layout-top>
      <Snowfall part="layer" />
    </template>
    <template #nav-bar-title-before>
      <NavBarLogo />
    </template>
    <template #nav-bar-content-after>
      <Snowfall part="toggle" />
    </template>
    <template #aside-outline-after>
      <Banner v-if="showBanner" />
    </template>
  </DefaultLayout>
</template>
