/**
 * Check if path is for a preview page.
 * @param {String} path current route.path
 */
function isPreviewPath (path) {
  return (path.indexOf('/preview/') === 0)
}

/**
 * Check if path is for a share link page.
 * @param {String} path current route.path
 */
function isShareLinkPath (path) {
  return (path.indexOf('/share_link/') === 0)
}

export { isPreviewPath }
export { isShareLinkPath }
