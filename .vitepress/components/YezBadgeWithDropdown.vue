<!-- components/YezBadgeWithDropdown.vue -->
<template>
  <div class="badge-with-dropdown">
    <YezBadge :type="type" :text="text" :url="url" />

    <div class="dropdown">
      <button @click="toggleDropdown" class="dropdown-button">
        Архив
        <svg class="arrow" :class="{ 'open': isOpen }" width="16" height="16" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <div v-if="isOpen" class="dropdown-content">
        <a v-for="version in versions" :key="version.text" :href="version.url" target="_blank"
          rel="noopener noreferrer">
          {{ version.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import YezBadge from './YezBadge.vue'

const props = defineProps({
  type: String,
  text: String,
  url: String,
  versions: {
    type: Array,
    required: true,
    default: () => []
  }
})

const isOpen = ref(false)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.dropdown {
  position: relative;
}

.badge-with-dropdown {
  display: flex;
  gap: 12px;
  align-items: center;
}

.dropdown-button {
  font-size: 1.2rem;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.dropdown-button .arrow {
  transition: transform 0.2s ease;
}

.dropdown-button .arrow.open {
  transform: rotate(180deg);
}

.dropdown-content {
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 1.1rem;
  z-index: 1;
}

.dropdown-content a {
  text-decoration: none;
  color: white;
  background-color: #0f98d9;
  display: block;
}

.dropdown-content a:first-child {
  border-radius: 10px 10px 0px 0px;
}

.dropdown-content a:last-child {
  border-radius: 0px 0px 10px 10px;
}

.dropdown-content a:hover {
  background-color: #1f81e2;
}
.dropdown-content a:first-child:last-child {
  border-radius: 10px 10px 10px 10px;
}

html.dark .dropdown-content a {
  color: #0f98d9;
  background-color: white;
}

html.dark .dropdown-content a:hover {
  background-color: #f1f1f1;
}
</style>
