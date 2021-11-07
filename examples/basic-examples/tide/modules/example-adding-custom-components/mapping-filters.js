module.exports = {
  customFilter: (customOptions) => {
    if (customOptions.field_paragraph_options) {
      const json = JSON.parse(customOptions.field_paragraph_options)
      if (json.exampleParam1) {
        return json.exampleParam1
      }
    }
    return null
  }
}
