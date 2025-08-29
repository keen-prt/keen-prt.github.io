<!-- components/YezBadge.vue -->
<template>
  <a :href="resolvedUrl" target="_blank" rel="noopener noreferrer" :class="`VPBadge ${type}`"
     style="text-decoration: none; color: inherit;">
    {{ text }}
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Interface / Download">
        <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="var(--svg-color)" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>
  </a>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: String,
  text: String,
  url: {
    type: String,
    required: true
  }
})
const encodedExternalUrl = 'aHR0cHM6Ly9vc3ZhdWx0LmtlZW5ldGljcG9ydGVkLmRldg=='
const resolvedUrl = computed(() => {
  if (props.url.startsWith('http')) {
    return props.url
  }
  
  if (props.url.startsWith('/assets/')) {
    const pathParts = props.url.split('/')
    const remainingPath = pathParts.slice(2).join('/')
    const decodedUrl = atob(encodedExternalUrl)
    return `${decodedUrl}/${remainingPath}`
  }
  
  return props.url
})
</script>
<style scoped>
.VPBadge.keenetic {
  --svg-color: white;
  transform: translateY(0px);
  display: flex;
  color: white !important;
  align-items: center;
  gap: 10px;
  transition: 0.1s linear;
}

.VPBadge.keenetic:hover {
  --svg-color: #0f98d9;
  background-color: white;
  color: #0f98d9 !important;
  transition: 0.1s linear;
}
</style>
