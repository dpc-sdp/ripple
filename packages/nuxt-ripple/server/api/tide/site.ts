//@ts-nocheck runtime imports
import { defineEventHandler, getQuery, H3Event } from 'h3'
import { createHandler, TideSiteApi } from '@dpc-sdp/ripple-tide-api'
import { BadRequestError } from '@dpc-sdp/ripple-tide-api/errors'
import { useNitroApp } from '#imports'

export const createSiteHandler = async (
  event: H3Event,
  tideSiteApi: TideSiteApi
) => {
  return createHandler(event, 'TidePageHandler', async () => {
    const query = await getQuery(event)

    if (!query.id) {
      throw new BadRequestError('Site id is required')
    }

    const sectionId = getHeader(event, 'x-section-request-id')

    const siteResponse = await tideSiteApi.getSiteData(query.id, sectionId)

    // Need to pass on the section cache tags to the nuxt app
    if (siteResponse.headers && siteResponse.headers['section-cache-tags']) {
      setResponseHeader(
        event,
        'section-cache-tags',
        siteResponse.headers['section-cache-tags']
      )
    }

    return siteResponse.data
  })
}

export default defineEventHandler(async (event: H3Event) => {
  const nitroApp = useNitroApp()
  return createSiteHandler(event, nitroApp.tide.siteApi)
})
