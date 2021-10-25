export const getFilteredResults = (results, filterObj) => {
  if (filterObj && typeof filterObj === 'object') {
    return results.filter(itm => {
      const filterKeys = Object.keys(filterObj)
      return filterKeys.some(key => {
        if (itm.hasOwnProperty(key) && itm[key] === filterObj[key]) {
          return true
        }
      })
    })
  }
  return results
}

export default function (ctx, next) {
  try {
    if (ctx.query.filters) {
      const filters = ctx.query.filters
      const filterObject = typeof filters === 'object' ? filters : JSON.parse(filters)
      const filteredResults = getFilteredResults(ctx.results, filterObject)
      ctx.results = [...filteredResults]
      ctx.total = filteredResults.length
    }
  } catch (error) {
    console.error(error)
  }
  
  next()
}
