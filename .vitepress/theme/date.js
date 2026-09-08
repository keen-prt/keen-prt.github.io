export const getCurrentDateInfo = (now = new Date()) => {
  const year = now.getFullYear()
  const month = now.getMonth()

  const date = new Date(Date.UTC(
    year,
    now.getMonth(),
    now.getDate()
  ))

  const day = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - day)

  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const week = Math.ceil(
    (((date - yearStart) / 86400000) + 1) / 7
  )
  return { year, month, week }
}

export const isWinterPeriod = () => {
  if (typeof window === 'undefined') return false
  const { month } = getCurrentDateInfo()
  return month === 11 || month === 0 || month === 1
}
