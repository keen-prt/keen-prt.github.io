<!-- .vitepress/theme/Layout.vue -->
<template>
  <div>
    <main>
      <slot></slot>
    </main>
    <footer>
      <!-- Рекламный блок -->
      <div id="ad-container">
        <div id="yandex_rtb_R-A-11653208-1"></div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (window.yaContextCb) {
    window.yaContextCb.push(() => {
      Ya.Context.AdvManager.render({
        blockId: "R-A-11653208-1",
        renderTo: "yandex_rtb_R-A-11653208-1"
      });
    });
  } else {
    window.yaContextCb = window.yaContextCb || [];
    window.yaContextCb.push(() => {
      Ya.Context.AdvManager.render({
        blockId: "R-A-11653208-1",
        renderTo: "yandex_rtb_R-A-11653208-1"
      });
    });
  }
});
</script>

<style scoped>
#ad-container {
  padding: 20px;
  text-align: center;
}
</style>
