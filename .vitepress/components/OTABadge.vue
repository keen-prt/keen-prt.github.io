<!-- components/OTABadge.vue -->
<template>
  <ClientOnly>
    <a :href="url" target="_blank" rel="noopener noreferrer" :class="`VPBadge ${type}`"
       style="text-decoration: none; color: inherit;">
      <span v-if="text">{{ text }}</span>
    </a>
  </ClientOnly>
</template>

<script setup>
defineProps({
  type: String,
  text: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: '/wiki/helpful/updateFirmware#способ-2'
  }
})
</script>

<style scoped>
.VPBadge.keenetic {
  transform: translateY(0px);
  display: flex;
  color: white !important;
  background-color: rgba(128, 128, 128, 1);
  align-items: center;
  gap: 10px;
  transition: 0.1s linear;
}
</style>