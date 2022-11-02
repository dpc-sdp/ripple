//@ts-nocheck import typing needs fixing
import { defineEventHandler, getQuery, CompatibilityEvent } from 'h3'
import { createHandler } from '@dpc-sdp/ripple-tide-api'

export const createSiteHandler = async (
  event: CompatibilityEvent,
  tideSiteApi: TidePage
) => {
  return createHandler(event, 'TidePageHandler', async () => {
    const query = await getQuery(event)

    if (!query.id) {
      throw new BadRequestError('Site id is required')
    }

    return await tideSiteApi.getSiteData(query.id)
  })
}

export default defineEventHandler(async (event: CompatibilityEvent) => {
  return createSiteHandler(event, event.context.tide.siteApi)
})
