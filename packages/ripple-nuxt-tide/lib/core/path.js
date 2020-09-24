/**
 * Check if path is for a preview page.
 * @param {String} path current route.path
 */
function isPreviewPath (path) {
  return (path.indexOf('/preview/') === 0)
}

export { isPreviewPath }
