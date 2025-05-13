//@ts-nocheck runtime imports
import { defineEventHandler, H3Event } from 'h3'
import { createHandler, TideSiteApi } from '@dpc-sdp/ripple-tide-api'
import { useNitroApp, useRuntimeConfig } from '#imports'

export const createSiteHandler = async (
  event: H3Event,
  tideSiteApi: TideSiteApi
) => {
  return createHandler(event, 'TidePageHandler', async () => {
    const { site } = useRuntimeConfig().public.tide

    const sectionId = getHeader(event, 'x-section-request-id')

    const siteResponse = await tideSiteApi.getSiteData(site, sectionId)

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
