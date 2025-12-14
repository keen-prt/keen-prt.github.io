import { ref } from 'vue'

const enabled = ref(true)

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


