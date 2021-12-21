export const getPaginatedResults = (results, size, page = 1) => {
  if (results && results.length > 0 && size) {
    if (page) {
      return results.slice((page - 1) * size, page * size)
    }
    return results.slice(0, size)
  } else if (!results) {
    return []
  }
  return results
}

export default function (ctx, next) {
  const paginatedResults = getPaginatedResults(ctx.results, ctx.query.size, ctx.query.page)
  ctx.results = paginatedResults
  next()
}
