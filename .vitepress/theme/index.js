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
