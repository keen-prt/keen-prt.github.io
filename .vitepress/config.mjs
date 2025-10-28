import { defineConfig } from 'vitepress'
import { createGlobalUrlReplacer } from './plugins/replacer.js'

export default defineConfig({
  head: [
    ['link', { rel: 'icon', href: '/assets/images/logo.png' }],
    ['meta', { property: 'og:title', content: 'Keenetic Ported Wiki' }],
    // ['meta', { property: 'og:image', content: '/assets/images/seo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Keenetic Ported Wiki' }],
    ['script', { async: true, src: `https://www.googletagmanager.com/gtag/js?id=G-GDED2LP6Y9` }],
    [
      'script',
      {},
      `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-GDED2LP6Y9');
    `
    ]
  ],
  ignoreDeadLinks: false,
  lang: 'ru-RU',
  base: '/',
  cleanUrls: true,
  assetsDir: 'static',
  title: 'Keenetic Ported Wiki',
  description: 'Портированная прошивка на Ваш роутер',
  markdown: {
    container: {
      tipLabel: 'Совет',
      warningLabel: 'ПРЕДУПРЕЖДЕНИЕ',
      dangerLabel: 'Внимание!',
      infoLabel: 'Информация',
      detailsLabel: 'Подробная информация'
    }
  },

  vite: {
    plugins: [
      createGlobalUrlReplacer()
    ]
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Поиск',
                buttonAriaLabel: 'Поиск'
              },
              modal: {
                displayDetails: 'Отобразить подробный список',
                resetButtonTitle: 'Сбросить поиск',
                backButtonTitle: 'Закрыть поиск',
                noResultsText: 'Нет результатов по запросу',
                footer: {
                  selectText: 'выбрать',
                  selectKeyAriaLabel: 'выбрать',
                  navigateText: 'перейти',
                  navigateUpKeyAriaLabel: 'стрелка вверх',
                  navigateDownKeyAriaLabel: 'стрелка вниз',
                  closeText: 'закрыть',
                  closeKeyAriaLabel: 'esc'
                }
              }
            }
          }
        }
      }
    },
    lastUpdated: {
      text: 'Последнее изменение',
      formatOptions: {
        dateStyle: 'medium'
      }
    },
    lang: {
      copy: 'Скопировано!',
      copied: 'Скопировано!'
    },
    outlineTitle: 'На этой странице',
    lightModeSwitchTitle: 'Светлая тема',
    darkModeSwitchTitle: 'Темная тема',
    darkModeSwitchLabel: 'Оформление',
    returnToTopLabel: 'Наверх',
    notFound: {
      title: 'Страница не найдена',
      quote: 'Попробуйте еще раз',
      linkText: 'Вернуться'
    },
    footer: {
      message:
        'Используемые на данном сайте товарные знаки, логотипы и другие объекты интеллектуальной собственности принадлежат компании Keenetic и ее партнёрам.<br>Команда Keenetic Ported не владеет никакими правами на указанные объекты, вся информация на сайте представлена исключительно для личного пользования в ознакомительных целях.',
      copyright: '© 2025 Keenetic Ported. Все права защищены.'
    },
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },
    sidebarMenuLabel: 'Меню',
    logo: '/assets/images/logo.svg',
    siteTitle: false,
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Wiki', link: '/wiki' },
      { text: 'Telegram', link: 'https://t.me/KeeneticPorted' }
    ],

    sidebar: [
      {
        text: 'Прошивки',
        collapsed: false,
        items: [
          {
            text: 'Active',
            items: [
              { text: '🆕 Netis NX32U', link: '/wiki/guides/netis-nx32u' },
              { text: '🆕 Cudy WR3000P', link: '/wiki/guides/WR3000P' },
              { text: '⭐️ Netis NX31', link: '/wiki/guides/netis-nx31' },
              { text: '⚡️ CMCC RAX3000M', link: '/wiki/guides/rax3000m' },
              { text: '⚡️ CMCC RAX3000ME', link: '/wiki/guides/rax3000me' },
              { text: '🚀 Xiaomi AX3000T', link: '/wiki/guides/ax3000t' },
              { text: 'Redmi AX6S', link: '/wiki/guides/ax6s' },
              { text: 'Netis N6 AX1800', link: '/wiki/guides/NetisN6' },
              { text: 'SmartBox Giga', link: '/wiki/guides/smartbox-giga' },
              { text: 'Xiaomi 3G', link: '/wiki/guides/xiaomi-3Gv1' }
            ]
          },
          {
            text: 'EoL / EoD',
            collapsed: true,
            items: [
              { text: 'Linksys EA7XXX', link: '/wiki/guides/linksys' },
              { text: 'HLK7621 32/256', link: '/assets/files/firmware/HLK7621_256_32.zip' },
              { text: 'Mercusys MR70X', link: '/wiki/guides/mercusys-mr70x' },
              { text: 'МТС WG430223', link: '/wiki/guides/mtc-wg430223' },
              { text: 'SmartBox Flash', link: '/wiki/guides/smartbox-flash' },
              { text: 'SmartBox Pro', link: '/wiki/guides/smartbox-pro' },
              { text: 'SmartBox Turbo+', link: '/wiki/guides/smartbox-turbo+' },
              { text: 'TP-Link Archer C6U', link: '/wiki/guides/archerc6u' },
              { text: 'TP-Link EC330-G5u', link: '/wiki/guides/TP-Link-EC330-G5u' },
              { text: 'WiFire S1500.NBN', link: '/wiki/guides/wifire-s1500' },
              { text: 'Xiaomi 3P', link: '/wiki/guides/xiaomi-3P' },
              { text: 'Xiaomi 4', link: '/wiki/guides/xiaomi-4' },
              { text: 'Xiaomi 4AC', link: '/wiki/guides/xiaomi-4AC' },
              { text: 'Xiaomi 4Av1', link: '/wiki/guides/xiaomi-4AG' },
              { text: 'Xiaomi 4Av2', link: '/wiki/guides/xiaomi-4AGv2' },
              { text: 'Xiaomi 4C', link: '/wiki/guides/xiaomi-4C' },
              { text: 'Xiaomi Extender', link: '/wiki/guides/xiaomi-extender' },
              { text: 'Vertell Street M2', link: '/wiki/guides/vertell-street-m2' }
            ]
          }
        ]
      },
      {
        text: 'Внешние ресурсы',
        collapsed: false,
        items: [
          {
            items: [
              { text: '💻 Онлайн-сервис для EEPROM', link: 'https://yeezyio.github.io/' },
              { text: '💬 Отправка SMS в Telegram', link: 'https://github.com/spatiumstas/sms2gram' },
              { text: '🔗 Маршрутизация трафика', link: 'https://magitrickle.dev' },
              { text: '📊 Тесты покрытия', link: 'https://docs.google.com/spreadsheets/d/1l3qt2GBfgMIeYq38UOzzCboxMMymEfy2UQg04Fd50Ew/' }
            ]
          }
        ]
      },
      {
        text: 'Полезное',
        collapsed: false,
        items: [
          {
            items: [
              { text: '💳 Ранние сборки | Boosty', link: '/wiki/helpful/boosty' },
              { text: '🧩 Компоненты', link: '/wiki/helpful/components' },
              { text: '📦 Установка Entware', link: '/wiki/helpful/entware' },
              { text: '❓ FAQ', link: '/wiki/helpful/faq' },
              { text: '🔄 Обновление прошивки', link: '/wiki/helpful/updateFirmware' },
              { text: '🔙 Откат прошивки', link: '/wiki/helpful/revertFirmware' },
              { text: '⚙️ Загрузчик KeenBOOT', link: '/wiki/helpful/keenboot' },
              { text: '🧩 Загрузчик Breed', link: '/wiki/helpful/breedBootloader' },
              { text: '🧰 KeenKit', link: '/wiki/helpful/keenkit' },
              { text: '🌐 Настройка Mesh', link: '/wiki/helpful/mesh' },
              { text: '🗂️ Сборник файлов', link: '/wiki/helpful/files' }
            ]
          }
        ]
      }
    ],

    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z"/></svg>'
        },
        link: 'https://t.me/KeeneticPorted',
        ariaLabel: 'Telegram'
      }
    ]
  }

})
