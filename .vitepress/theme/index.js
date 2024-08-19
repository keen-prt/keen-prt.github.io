// https://vitepress.dev/guide/custom-theme
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
  enhanceApp({ app, router, siteData }) {
    app.component("YezBadge", YezBadge);
    app.component("YezBadgeWithDropdown", YezBadgeWithDropdown);

    if (typeof document !== "undefined") {
      // Добавляем необходимые скрипты в <head>
      const script1 = document.createElement("script");
      script1.text = "window.yaContextCb=window.yaContextCb||[]";
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.src = "https://yandex.ru/ads/system/context.js";
      script2.async = true;
      document.head.appendChild(script2);
    }

    onMounted(() => {
      // Вставляем блок рекламы в нужное место
      const sidebarNav = document.querySelector(".VPSidebarNav");
      if (sidebarNav) {
        const groupDivs = sidebarNav.querySelectorAll(".group");
        if (groupDivs.length > 1) {
          const adDiv = document.createElement("div");
          adDiv.id = "yandex_rtb_R-A-11653208-1";

          const adScript = document.createElement("script");
          adScript.text = `
            window.yaContextCb.push(() => {
                Ya.Context.AdvManager.render({
                    "blockId": "R-A-11653208-1",
                    "renderTo": "yandex_rtb_R-A-11653208-1"
                })
            })
          `;

          groupDivs[0].insertAdjacentElement("afterend", adDiv);
          adDiv.insertAdjacentElement("afterend", adScript);
        }
      }
    });
  },
};
