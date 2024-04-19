export function stripSiteId(url, replace = '') {
  return url?.replace(/\/site-(\d+)/, replace)
}

export default stripSiteId
