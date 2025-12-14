import { ref } from 'vue'

export function isWinterPeriod() {
  if (typeof window === 'undefined') return false
  const d = new Date()
  const m = d.getMonth()
  return m === 11 || m === 0 || m === 1
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


