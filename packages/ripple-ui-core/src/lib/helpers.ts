export const isExternalLink = (link: string): boolean => {
  const url = new URL(link)

  if (typeof window === 'undefined') {
    return false
  }

  return window.location.host !== url.host
}

export const distanceAsPercentage = (point: number, total: number): number => {
  if (point < 0) {
    return 0
  }
  if (point > total) {
    return 100
  }

  return Number(((point / total) * 100).toFixed(2))
}

export const formatDate = (
  value: string,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const date = new Date(value)

  const defaultOptions: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }

  options = { ...defaultOptions, ...options }

  return new Intl.DateTimeFormat('en-AU', options).format(date)
}

export { formatDateRange } from './formatDateRange.js'
