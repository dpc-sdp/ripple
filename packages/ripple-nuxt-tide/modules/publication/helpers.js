// Helpers for publication module
function mergeFields (tideConfigs) {
  if (tideConfigs.length === 1) {
    return tideConfigs.includes.publicationPage
  }
  let mergedFields = []
  tideConfigs.map(tideConfig => {
    mergedFields.concat(tideConfig.includes.publicationPage)
  })
  return mergedFields
}

export { mergeFields }
