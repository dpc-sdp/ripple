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

  return Number((point / total * 100).toFixed(2))
}
