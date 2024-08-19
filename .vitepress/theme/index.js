import { h, onMounted, watch, nextTick } from "vue";
import DefaultTheme from "vitepress/theme";
import { useRoute } from "vitepress";
import mediumZoom from "medium-zoom";
import "./style.css";
import YezBadge from "../components/YezBadge.vue";
import YezBadgeWithDropdown from "../components/YezBadgeWithDropdown.vue";

/** @type {import('vitepress').Theme} */
export default {
  setup() {
    const route = useRoute();

    onMounted(() => {
      console.log('Setup onMounted is working');

      // Функция для вставки рекламы
      const insertAdBlock = () => {
        const sidebarNav = document.querySelector('.VPSidebarNav');
        if (sidebarNav) {
          console.log('VPSidebarNav found via setInterval');
          const groupDivs = sidebarNav.querySelectorAll('.group');
          console.log(`Found ${groupDivs.length} group divs`);
          if (groupDivs.length > 1) {
            const adDiv = document.createElement('div');
            adDiv.id = 'yandex_rtb_R-A-11653208-1';

            const adScript = document.createElement('script');
            adScript.text = `
              window.yaContextCb.push(() => {
                  Ya.Context.AdvManager.render({
                      "blockId": "R-A-11653208-1",
                      "renderTo": "yandex_rtb_R-A-11653208-1"
                  })
              })
            `;

            groupDivs[0].insertAdjacentElement('afterend', adDiv);
            adDiv.insertAdjacentElement('afterend', adScript);
            console.log('Ad block inserted');

            // Останавливаем проверку после вставки рекламы
            clearInterval(intervalId);
          } else {
            console.log('Not enough group divs found via setInterval');
          }
        }
      };

      // Проверяем DOM каждую секунду, пока не найдем элемент
      const intervalId = setInterval(insertAdBlock, 1000);
    });

    const initZoom = () => {
      mediumZoom("[data-zoomable]", { background: "var(--vp-c-bg)" });
      mediumZoom(".main img", {
        background: "var(--vp-c-bg)",
      });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
};
