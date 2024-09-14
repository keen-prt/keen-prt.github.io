<!-- components/YezBadge.vue -->
<template>
    <a :href="url" target="_blank" rel="noopener noreferrer" :class="`VPBadge ${type}`"
        style="text-decoration: none; color: inherit;">
        EOD
    </a>
</template>

<script setup>
defineProps({
    type: String
})
</script>
<style scoped>
.VPBadge.keenetic {
    transform: translateY(0px);
    display: flex;
    color: white !important;
    align-items: center;
    gap: 10px;
    transition: 0.1s linear;
}

.VPBadge.keenetic:hover {
    background-color: yellow;
    color: #0f98d9 !important;
    transition: 0.1s linear;
}
</style>
