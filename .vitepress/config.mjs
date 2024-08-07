import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/assets/images/favicon.svg' }]],
  lang: "ru-RU",
  base: "/",
  cleanUrls: true,
  assetsDir: 'static',
  title: "keen_prt_wiki",
  description: "wiki about keenetic",
  themeConfig: {
    outlineTitle: 'На этой странице',
    lightModeSwitchTitle: 'Светлая тема',
    darkModeSwitchTitle: 'Темная тема',
    darkModeSwitchLabel: 'Оформление',
    returnToTopLabel: 'Наверх',
    docFooter: {
			prev: false,
			next: false
		  },
    sidebarMenuLabel: 'Меню',
    logo: "/assets/images/logo.svg",
    siteTitle: false,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Главная", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
