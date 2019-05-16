const iconProps = {}
let hasRunOnce = false

/**
 * Add icon properties from a require.context() response to `iconProps`.
 * Custom icons should be added before the ripple-icon component is used.
 *
 * Can be used as:
 *   addIconsToLibrary(require.context('./custom_assets/', true, /\.svg$/))
 *
 * @param {Function} webpackContext The function returned from a require.context() call.
 */
function addIconsToLibrary (webpackContext) {
  webpackContext.keys().forEach(key => {
    const icon = webpackContext(key)
    if (icon.default) {
      const viewBoxSplit = icon.default.viewBox.split(' ')
      if (!iconProps[icon.default.id]) {
        iconProps[icon.default.id] = {
          width: parseFloat(viewBoxSplit[2]),
          height: parseFloat(viewBoxSplit[3])
        }
      }
    }
  })
}

function getIconProps () {
  // Add default icons on first call.
  // For correct overrides; this must run after custom icons have been added.
  if (!hasRunOnce) {
    hasRunOnce = true
    // In Jest there is no webpack require.context support, also we don't transform files.
    // Let's skip this part in tests.
    if (process.env.NODE_ENV !== 'test') {
      addIconsToLibrary(require.context('./assets/img/', true, /\.svg$/))
    }
  }
  return iconProps
}

export { getIconProps }
export { addIconsToLibrary }
export default getIconProps
