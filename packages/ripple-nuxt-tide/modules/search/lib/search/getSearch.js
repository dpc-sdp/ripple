import search from './module.js'

// This is a feature toggler for switch search between on demand mode and global mode(default).
const getSearch = (app) => {
  let tideSearch
  if (app.$tideSearchOptions.loadOnDemand) {
    tideSearch = search(app.$tideSearchOptions, app.router, app.store.state.tideSite.siteId)
  } else {
    tideSearch = app.$tideSearch
  }
  return tideSearch
}

export default getSearch
