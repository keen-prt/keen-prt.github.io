import { ref } from 'vue'
import { isWinterPeriod } from './date'
export const LOGO = '/assets/images/logo.svg'
export const LOGO_NY = '/assets/images/logo-ny.svg'

export function getNavLogoSrc() {
  return isWinterPeriod() ? LOGO_NY : LOGO
}

const enabled = ref(isWinterPeriod())

export function useSnowfall() {
  const setEnabled = (value) => {
    enabled.value = Boolean(value)
  }

  const toggle = () => setEnabled(!enabled.value)

  return {
    enabled,
    setEnabled,
    toggle
  }
}


