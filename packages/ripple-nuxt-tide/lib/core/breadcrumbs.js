// Private helpers
function getActivePath (branch, path) {
  for (let i = 0; i < branch.length; i++) {
    const item = branch[i]
    if (item.url === path) {
      return [{
        text: item.text,
        url: item.url
      }]
    } else if (item.children) {
      const childPaths = getActivePath(item.children, path)
      if (childPaths.length > 0) {
        return [{
          text: item.text,
          url: item.url
        }].concat(childPaths)
      }
    }
  }
  return []
}

/**
 * Returns an array of active links in the current path.
 * @param {String} path The path of the current URL e.g. '/test-page'
 * @param {String} pageTitle The title of the current page.
 * @param {Object} menu The menu object.
 */
export const breadcrumbs = (path, pageTitle, menu) => {
  let linkList = [{ text: 'Home', url: '/' }]
  const activePath = menu ? getActivePath(menu, path) : []
  if (activePath.length === 0) {
    linkList.push({ text: pageTitle, url: path })
  } else {
    linkList = linkList.concat(activePath)
  }
  return linkList
}
