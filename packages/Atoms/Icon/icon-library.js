const iconProps = {}

/**
 * Add icon properties from a require.context() response to `iconProps`.
 * Custom icons should be added before Vue is invoked.
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

export { iconProps }
export { addIconsToLibrary }
export default iconProps
