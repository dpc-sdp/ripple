//@ts-ignore
import { defineEventHandler, useQuery } from 'h3'
export default defineEventHandler(async (event) => {
  const query = await useQuery(event)
  const response = await event.context.tide.siteApi.getSiteData(query.id)
  return response
})
