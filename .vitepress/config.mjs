import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "/assets/images/favicon.svg", }],
    ['meta', { property: 'og:title', content: 'Keenetic Ported Wiki' }],
    ['meta', { property: 'og:image', content: '/assets/images/seo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Keenetic Ported Wiki' }],
  ],
  lang: "ru-RU",
  base: "/",
  cleanUrls: true,
  assetsDir: "static",
  title: "Keenetic Ported Wiki",
  description: "Портированная прошивка на Ваш роутер",
  markdown: {
    container: {
      tipLabel: "СОВЕТ",
      warningLabel: "ПРЕДУПРЕЖДЕНИЕ",
      dangerLabel: "ОПАСНОСТЬ",
      infoLabel: "ИНФОРМАЦИЯ",
      detailsLabel: "Подробная информация",
    },
  },
  themeConfig: {
    lang: {
      copy: 'Скопировано!', // Текст после копирования
      copied: 'Скопировано!' // Текст, отображаемый после успешного копирования
    },
    outlineTitle: "На этой странице",
    lightModeSwitchTitle: "Светлая тема",
    darkModeSwitchTitle: "Темная тема",
    darkModeSwitchLabel: "Оформление",
    returnToTopLabel: "Наверх",
    notFound: {
      title: "Страница не найдена",
      quote: "Попробуйте еще раз",
      linkText: "Вернуться",
    },
    footer: {
      message:
        "Используемые на данном сайте товарные знаки, логотипы и другие объекты интеллектуальной собственности принадлежат компании Keenetic и ее партнёрам.<br>Команда keen_prt не владеет никакими правами на указанные объекты, вся информация на сайте представлена исключительно для личного пользования в ознакомительных целях.",
      copyright: "© 2024 keen_prt. Все права защищены.",
    },
    docFooter: {
      prev: false,
      next: false,
    },
    sidebarMenuLabel: "Меню",
    logo: "/assets/images/logo.svg",
    siteTitle: false,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Главная", link: "/" },
      { text: "WIKI", link: "/wiki" },
    ],

    sidebar: [
      {
        text: "Инструкции по установке",
        collapsed: false  ,
        items: [
          {
            items: [
              { text: "🚀⭐️Redmi AX6S", link: "/wiki/guides/ax6s" },
              { text: "⚡ Netis N6 AX1800", link: "/wiki/guides/NetisN6" },
              { text: "TP-Link EC330", link: "/wiki/guides/TP-Link-EC330-G5u" },
              { text: "🥚 МТС WG430223", link: "/wiki/guides/mts-wg430223" },
              { text: "SmartBox Flash", link: "/wiki/guides/smartbox-flash" },
              { text: "SmartBox Giga", link: "/wiki/guides/smartbox-giga" },
              { text: "SmartBox Pro", link: "/wiki/guides/smartbox-pro" },
              { text: "SmartBox Turbo+", link: "/wiki/guides/smartbox-turbo+" },
              { text: "WiFire NBN1500", link: "/wiki/guides/wifire-s1500" },
              { text: "Xiaomi 4", link: "/wiki/guides/xiaomi-4" },
              { text: "Xiaomi 4AG", link: "/wiki/guides/xiaomi-4AG" },
              { text: "Xiaomi 4C", link: "/wiki/guides/xiaomi-4C" },
              { text: "Mercusys MR70X", link: "/wiki/guides/mercusys-mr70x" },
              { text: "Linksys EA7XXX", link: "/wiki/guides/linksys" },
            ],
          },
        ],
      },
      {
        text: "Полезное",
        collapsed: false,
        items: [
          {
            items: [
              { text: "FAQ", link: "/wiki/helpful/faq" },
              { text: "Обновление Keenetic", link: "/wiki/helpful/updateFirmware" },
              { text: "Загрузчик Breed", link: "/wiki/helpful/breedBootloader" },
              { text: "KeenKit", link: "/wiki/helpful/keenkit" },
              { text: "Установка Entware", link: "/wiki/helpful/entware" },
              { text: "Онлайн-сервис для EEPROM", link: "https://yeezyio.github.io/" },
            ],
          },
        ],
      },
      // {
      //   text: "Разное",
      //   collapsed: false,
      //   items: [
      //     {
      //       items: [
      //         { text: "BreedEnter", link: "/config/four" },
      //         { text: "Тесты покрытия разных моделей", link: "/config/four" },
      //         { text: "Варианты удаленного доступа", link: "/config/four" },
      //         { text: "Дамп Breed для заливки через программатор", link: "/config/four" },
      //         { text: "Прошивка через MacOS", link: "/config/four" },
      //       ],
      //     },
      //   ],
      // },
    ],

    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z"/></svg>',
        },
        link: "https://t.me/keen_prt",
        // Вы также можете включить пользовательский ярлык для доступности (необязательно, но рекомендуется):
        ariaLabel: "классная ссылка",
      },
    ],
  },
});
