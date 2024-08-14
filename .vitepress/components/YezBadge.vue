<!-- components/YezBadge.vue -->
<template>
    <span :class="`VPBadge ${type}`">
        {{ text }}
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Interface / Download">
                <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#000000" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
            </g>
        </svg>
    </span>
</template>

<script setup>
defineProps({
    type: String,
    text: String,
})
</script>


