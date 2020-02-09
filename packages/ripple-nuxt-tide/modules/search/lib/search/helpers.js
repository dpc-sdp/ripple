export const searchPageRedirect = (router, searchPagePath, searchInput, filters = null) => {
  let query = {
    q: searchInput
  }
  if (filters) {
    query.filters = filters
  }
  router.push({
    path: searchPagePath,
    query: query
  })
}
