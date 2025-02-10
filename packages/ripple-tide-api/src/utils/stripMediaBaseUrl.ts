export function stripMediaBaseUrl(url: string, baseUrl: string): string {
  if (!url || typeof url !== 'string' || typeof baseUrl !== 'string') {
    return url
  }

  if (!url.includes('/sites/default/files/')) {
    return url
  }

  return process.env.NUXT_PUBLIC_IS_STATIC
    ? url.split('?')[0]
    : url.replace(baseUrl.replace(/\/$/, ''), '')
}

export default stripMediaBaseUrl
