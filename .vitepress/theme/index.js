import { onMounted, watch, nextTick } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRoute, useRouter } from 'vitepress'
import './style.css'
import './custom.js'
import YezBadge from '../components/YezBadge.vue'
import Popup from '../components/Popup.vue'
import OTABadge from '../components/OTABadge.vue'
import GoodBlock from '../components/GoodBlock.vue'
import YezBadgeWithDropdown from '../components/YezBadgeWithDropdown.vue'
import BoostyBadge from '../components/BoostyBadge.vue'
import Layout from './Layout.vue'

const redirects = {
  '/wiki/guides/xiaomi-3Gv1': '/wiki/guides/xiaomi-3G',
  '/wiki/guides/mtc-wg430223': '/wiki/guides/mts-wg430223'
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

    const applyRouteEffects = () => {
      handleRedirects()
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
    }

    onMounted(() => applyRouteEffects())

    watch(
      () => route.path,
      () => nextTick(applyRouteEffects)
    )
  },
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('YezBadge', YezBadge)
    app.component('Popup', Popup)
    app.component('GoodBlock', GoodBlock)
    app.component('OTABadge', OTABadge)
    app.component('YezBadgeWithDropdown', YezBadgeWithDropdown)
    app.component('BoostyBadge', BoostyBadge)
  }
}