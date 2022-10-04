import { defineEventHandler, getQuery, CompatibilityEvent } from 'h3'
export default defineEventHandler(async (event: CompatibilityEvent) => {
  const query = await getQuery(event)
  const page = await event.context.tide.pageApi.getPageByPath(
    query.path,
    query.site
  )

  return page
})
