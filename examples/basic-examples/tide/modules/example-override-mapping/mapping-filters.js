// Filters for adding extra process on a mapping value

// Create more filters if need.
module.exports = {

  // Add your own filter, must with your own name prefix to avoid name conflict.
  eomPageTitle: (pageTitle) => {
    return `[demo] ${pageTitle}`
  },

  // An async filter example.
  eomIntroText: async (introText) => {
    const promise = new Promise((resolve, reject) => {
      // Do some process
      setTimeout(function () {
        const processed = `[demo] ${introText}`
        resolve(processed)
      }, 300)
    })
    return promise
  },

  // We can override core filter by using same core filter name.
  // Ripple v1.3.x required for this feature.
  // ! Be careful, this way is hard to maintain.
  // Use your own filter like above is the safer way.
  paragraphKeyJourneyLinks: function (fieldParagraphLinks) {
    if (typeof fieldParagraphLinks !== 'undefined' && fieldParagraphLinks !== null) {
      const rtn = []
      fieldParagraphLinks.forEach(item => {
        rtn.push({
          url: item.url || item.uri,
          text: `[demo] ${item.title}`
        })
      })
      return rtn
    }
  }

}
