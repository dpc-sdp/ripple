//@ts-nocheck runtime imports
import { defineEventHandler, getQuery, H3Event, getCookie } from 'h3'
import { createHandler, TidePageApi } from '@dpc-sdp/ripple-tide-api'
import { BadRequestError } from '@dpc-sdp/ripple-tide-api/errors'
import { useNitroApp } from '#imports'
export const createPageHandler = async (
  event: H3Event,
  tidePageApi: TidePageApi
) => {
  return createHandler(event, 'TidePageHandler', async () => {
    const query = await getQuery(event)

    if (!query.path || Array.isArray(query.path)) {
      throw new BadRequestError('Path is required')
    }

    if (Array.isArray(query.site)) {
      throw new BadRequestError('Duplicate site values')
    }
    const tokenCookie = getCookie(event, 'nuxt_access_token')

    return await tidePageApi.getPageByPath(query.path, query.site, {
      headers: { 'X-OAuth2-Authorization': `Bearer ${tokenCookie}` }
    })
  })
}

export default defineEventHandler(async (event: H3Event) => {
  const nitroApp = useNitroApp()
  return createPageHandler(event, nitroApp.tide.pageApi)
})
