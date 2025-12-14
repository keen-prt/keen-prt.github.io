<!-- components/BoostyBadge.vue -->
<template>
  <a :href="url" target="_blank" rel="noopener noreferrer" :class="`VPBadge ${type}`"
     style="text-decoration: none; color: inherit; background-color: #F15F2C;">
    <span v-if="text">{{ text }}</span>
    <svg class="boosty-badge-svg" viewBox="0 0 235.6 292.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="b_1_">
        <path class="st0" d="M44.3,164.5L76.9,51.6H127l-10.1,35c-0.1,0.2-0.2,0.4-0.3,0.6L90,179.6h24.8c-10.4,25.9-18.5,46.2-24.3,60.9
          c-45.8-0.5-58.6-33.3-47.4-72.1 M90.7,240.6l60.4-86.9h-25.6l22.3-55.7c38.2,4,56.2,34.1,45.6,70.5
          c-11.3,39.1-57.1,72.1-101.7,72.1C91.3,240.6,91,240.6,90.7,240.6z" />
      </g>
    </svg>
  </a>
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
    required: true,
    default: '/wiki/helpful/boosty'
  }
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
  background-color: #F15F2C;
}

.VPBadge.keenetic .boosty-badge-svg {
  width: 20px;
  height: 20px;
  transform: scale(1.5);
  transform-origin: center;
}

.st0 {
  fill: white;
}
</style>
