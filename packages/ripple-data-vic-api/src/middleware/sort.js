export const sortByField = (results, field, order = 'asc') => {
  if (typeof field === 'string') {
    return results.sort((aObj, bObj) => {
      const a = aObj[field]
      const b = bObj[field]
      return (a === null) - (b === null) || a.toString().localeCompare(b.toString(), undefined, {numeric: true})
    })
  }
  return results
}

export default function (ctx, next) {
  const sortedResults = sortByField(ctx.results, ctx.query.sort)
  ctx.results = [...sortedResults]
  next()
}
