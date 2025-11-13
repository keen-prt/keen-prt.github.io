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
import Banner from '../components/Banner.vue'

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

    const initZoom = () => {
      mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' })
      mediumZoom('.main img', {
        background: 'var(--vp-c-bg)'
      })
    }

    onMounted(() => {
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

    watch(
      () => route.path,
      () => {
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
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'aside-outline-after': () => h(Banner)
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