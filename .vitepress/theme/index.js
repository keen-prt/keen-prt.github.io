import { h, onMounted, watch, nextTick } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRoute, useRouter } from 'vitepress'
import mediumZoom from 'medium-zoom'
import './style.css'
import './custom.js'
import YezBadge from '../components/YezBadge.vue'
import Popup from '../components/Popup.vue'
import EODBadge from '../components/EODBadge.vue'
import GoodBlock from '../components/GoodBlock.vue'
import YezBadgeWithDropdown from '../components/YezBadgeWithDropdown.vue'
import BoostyBadge from '../components/BoostyBadge.vue'

const redirects = {
  '/wiki/guides/xiaomi-R3Gv1': '/wiki/guides/xiaomi-3Gv1'
}

/** @type {import('vitepress').Theme} */
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const handleRedirects = () => {
      const redirectPath = redirects[route.path]
      if (redirectPath) {
        router.go(redirectPath)
      }
    }

    onMounted(() => {
      handleRedirects()
      console.log('Setup onMounted is working')

      const script1 = document.createElement('script')
      script1.text = 'window.yaContextCb=window.yaContextCb||[]'
      document.head.appendChild(script1)

      const script2 = document.createElement('script')
      script2.src = 'https://yandex.ru/ads/system/context.js'
      script2.async = true
      document.head.appendChild(script2)

      const sidebarNav = document.querySelector('#VPSidebarNav')
      if (sidebarNav) {
        console.log('VPSidebarNav found')
        const groupDivs = sidebarNav.querySelectorAll('.group')
        console.log(`Found ${groupDivs.length} group divs`)
        if (groupDivs.length > 1) {
          const adDiv1 = document.createElement('div')
          adDiv1.id = 'yandex_rtb_R-A-11653208-1'

          const adScript1 = document.createElement('script')
          adScript1.text = `
            window.yaContextCb.push(() => {
                Ya.Context.AdvManager.render({
                    "blockId": "R-A-11653208-1",
                    "renderTo": "yandex_rtb_R-A-11653208-1"
                })
            });
          `

          groupDivs[0].insertAdjacentElement('afterend', adDiv1)
          adDiv1.insertAdjacentElement('afterend', adScript1)
          console.log('First ad block inserted')
        } else {
          console.log('Not enough group divs found')
        }
      } else {
        console.log('VPSidebarNav not found')
      }

      const docAsideOutline = document.querySelector('.VPDocAsideOutline')
      if (docAsideOutline) {
        console.log('VPDocAsideOutline found')
        const contentDiv = docAsideOutline.querySelector('.content')
        if (contentDiv) {
          const adDiv2 = document.createElement('div')
          adDiv2.id = 'yandex_rtb_R-A-11653208-2'

          const adScript2 = document.createElement('script')
          adScript2.text = `
            window.yaContextCb.push(() => {
                Ya.Context.AdvManager.render({
                    "blockId": "R-A-11653208-2",
                    "renderTo": "yandex_rtb_R-A-11653208-2"
                })
            });
          `

          contentDiv.insertAdjacentElement('afterend', adDiv2)
          adDiv2.insertAdjacentElement('afterend', adScript2)
          console.log('Second ad block inserted')
        } else {
          console.log('Content div not found inside VPDocAsideOutline')
        }
      } else {
        console.log('VPDocAsideOutline not found')
      }

      // Добавляем фиксированный рекламный блок поверх всего контента
      const fixedAd = document.createElement('div')
      fixedAd.id = 'yandex_rtb_R-A-11653208-4'
      fixedAd.style.position = 'fixed'
      fixedAd.style.bottom = '0'
      fixedAd.style.left = '0'
      fixedAd.style.width = '100%'
      fixedAd.style.height = '90px'
      fixedAd.style.zIndex = '10000'
      document.body.appendChild(fixedAd)

      const adScript = document.createElement('script')
      adScript.text = `
        window.yaContextCb.push(() => {
          Ya.Context.AdvManager.render({
            "blockId": "R-A-11653208-4",
            "renderTo": "yandex_rtb_R-A-11653208-4"
          })
        })
      `
      document.body.appendChild(adScript)

      // Добавляем отступ для контента, чтобы баннер не закрывал его
      const content = document.querySelector('#app')
      if (content) {
        content.style.marginTop = '90px'
      }

      if (window.location.hash) {
        const decodedHash = decodeURIComponent(window.location.hash)
        setTimeout(() => {
          const element = document.querySelector(decodedHash)
          if (element) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 80
            const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight

            window.scrollTo({ top: elementPosition, behavior: 'smooth' })
          }
        }, 100)
      }
    })

    const initZoom = () => {
      mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' })
      mediumZoom('.main img', {
        background: 'var(--vp-c-bg)'
      })
    }

    onMounted(() => {
      initZoom()
    })

    watch(
      () => route.path,
      () => {
        handleRedirects()
        nextTick(() => {
          initZoom()

          if (window.location.hash) {
            const decodedHash = decodeURIComponent(window.location.hash)
            setTimeout(() => {
              const element = document.querySelector(decodedHash)
              if (element) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 80
                const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight

                window.scrollTo({ top: elementPosition, behavior: 'smooth' })
              }
            }, 100)
          }
        })
      }
    )
  },
  extends:
  DefaultTheme,
  Layout:
    () => {
      return h(DefaultTheme.Layout, null, {
        // https://vitepress.dev/guide/extending-default-theme#layout-slots
      })
    },
  enhanceApp({ app, router, siteData }) {
    app.component('YezBadge', YezBadge)
    app.component('Popup', Popup)
    app.component('GoodBlock', GoodBlock)
    app.component('EODBadge', EODBadge)
    app.component('YezBadgeWithDropdown', YezBadgeWithDropdown)
    app.component('BoostyBadge', BoostyBadge)
  }
}
