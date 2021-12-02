export const getAggregationsForField = (results, fields) => {
  if (fields && Array.isArray(fields)) {
    const aggs = {}
    fields.forEach(field => {
      if (results && field) {
        aggs[field] = results
          .filter(itm => {
            if (itm.hasOwnProperty(field)) {
              return itm
            }
          })
          .map(itm => itm[field])
          .filter((itm, pos, self) => {
            return self.indexOf(itm) === pos
          })
          .sort((a, b) => {
            return (a === null) - (b === null) || a.toString().localeCompare(b.toString(), undefined, { numeric: true })
          })
      }
    })
    return aggs
  }
}

export default function (ctx, next) {
  if (ctx.query.aggs && typeof ctx.query.aggs === 'string') {
    const aggregations = getAggregationsForField(ctx.results, ctx.query.aggs.split(','))
    if (aggregations) {
      ctx.aggregations = aggregations
    }
  }
  next()
}
