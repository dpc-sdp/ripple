export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function stripSiteId(url: string, replace = '') {
  return url?.replace(/\/site-(\d+)/, replace)
}
