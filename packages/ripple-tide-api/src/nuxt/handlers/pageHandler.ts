// @ts-ignore: fix types on h3
import { defineEventHandler, useQuery } from 'h3'
export default defineEventHandler(async (event) => {
  const query = await useQuery(event)
  const page = await event.context.tide.pageApi.getPageByPath(
    query.path,
    query.site
  )

  return page
})
