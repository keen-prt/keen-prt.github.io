<script setup>
import { ref, onMounted } from 'vue'
import { getNavLogoSrc, LOGO } from '../snowfall'

const logoSrc = ref(LOGO)
onMounted(() => {
  logoSrc.value = getNavLogoSrc()
})
</script>

<template>
  <img class="logo" :src="logoSrc" alt="">
</template>

<style scoped>
.logo {
  margin-right: 8px;
  height: var(--vp-nav-logo-height);
}
</style>
