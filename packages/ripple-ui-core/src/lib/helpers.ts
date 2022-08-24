export const isExternalLink = (link: string): boolean => {
  const url = new URL(link)

  if (typeof window === 'undefined') {
    return false
  }

  return window.location.host !== url.host
}
