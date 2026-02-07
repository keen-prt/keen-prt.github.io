import { ref } from 'vue'
export const LOGO = '/assets/images/logo.svg'
export const LOGO_NY = '/assets/images/logo-ny.svg'

export function isWinterPeriod() {
  if (typeof window === 'undefined') return false
  const d = new Date()
  const m = d.getMonth()
  return m === 11 || m === 0 || m === 1
}

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


