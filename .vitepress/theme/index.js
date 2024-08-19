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

      const script = document.createElement('script');
      script.src = "https://yandex.ru/ads/system/context.js";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        console.log("Yandex script loaded.");
        window.yaContextCb.push(() => {
          Ya.Context.AdvManager.render({
            "blockId": "R-A-11653208-1",
            "renderTo": "yandex_rtb_R-A-11653208-1"
          });
        });
      };

      script.onerror = () => {
        console.error("Failed to load the Yandex script.");
      };
    });

    watch(
        () => route.path,
        () => nextTick(() => initZoom())
    );
  },
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "layout-top": () =>
          h('div', { id: 'yandex_rtb_R-A-11653208-1' })
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("YezBadge", YezBadge);
    app.component("YezBadgeWithDropdown", YezBadgeWithDropdown);
  },
};
