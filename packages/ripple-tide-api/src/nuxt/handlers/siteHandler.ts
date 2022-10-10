import { defineEventHandler, getQuery, CompatibilityEvent } from 'h3'
export default defineEventHandler(async (event: CompatibilityEvent) => {
  const query = await getQuery(event)
  const response = await event.context.tide.siteApi.getSiteData(query.id)
  return response
})
