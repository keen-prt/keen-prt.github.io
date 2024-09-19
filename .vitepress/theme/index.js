import { h, onMounted, watch, nextTick } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import './style.css'
import YezBadge from '../components/YezBadge.vue'
import Popup from '../components/Popup.vue'
import EODBadge from '../components/EODBadge.vue'
import GoodBlock from '../components/GoodBlock.vue'
import YezBadgeWithDropdown from '../components/YezBadgeWithDropdown.vue'

/** @type {import('vitepress').Theme} */
export default {
  setup() {
    const route = useRoute()

    onMounted(() => {
      console.log('Setup onMounted is working')

      // Добавление первого блока рекламы
      const script1 = document.createElement('script')
      script1.text = 'window.yaContextCb=window.yaContextCb||[]'
      document.head.appendChild(script1)

      const script2 = document.createElement('script')
      script2.src = 'https://yandex.ru/ads/system/context.js'
      script2.async = true
      document.head.appendChild(script2)

      // Вставка первого рекламного блока
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
            })
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

      // Вставка второго рекламного блока
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
            })
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
      () => nextTick(() => initZoom())
    )
  },
  extends: DefaultTheme,
  Layout: () => {
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
  }
}
