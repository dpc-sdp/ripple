function processUrl(url: string, baseUrl: string, isStatic: boolean): string {
  if (!url || typeof url !== 'string' || typeof baseUrl !== 'string') {
    return url
  }

  if (!url.includes('/sites/default/files/')) {
    return url
  }

  const urlPath = url.replace(baseUrl.replace(/\/$/, ''), '')

  return isStatic
    ? urlPath.replace('/sites/default/files/', '/_local/files/')
    : urlPath
}

export function stripMediaBaseUrl(url: string, baseUrl: string): string {
  return process.env.NUXT_PUBLIC_IS_STATIC
    ? url
    : processUrl(url, baseUrl, false)
}

export function defaultFilesPath(url: string, baseUrl: string): string {
  return processUrl(url, baseUrl, process.env.NUXT_PUBLIC_IS_STATIC === 'true')
}

export default stripMediaBaseUrl
