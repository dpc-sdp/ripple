export const distanceAsPercentage = (point: number, total: number): number => {
  if (point < 0) {
    return 0
  }
  if (point > total) {
    return 100
  }

  return Number(((point / total) * 100).toFixed(2))
}

export const epochToDate = (
  epoch: string,
  options: Intl.DateTimeFormatOptions = {}
): string | null => {
  const date = new Date(0)

  date.setUTCSeconds(Number(epoch))

  if (isNaN(date.getTime())) return null

  return formatDate(date, options)
}

export const formatDate = (
  value: string | number | Date,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const date = new Date(value)

  const defaultOptions: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }

  options = { ...defaultOptions, ...options }

  return new Intl.DateTimeFormat('en-AU', options).format(date)
}

export { formatDateRange } from './formatDateRange'
