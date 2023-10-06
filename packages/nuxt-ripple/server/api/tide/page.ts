//@ts-nocheck runtime imports
import {
  defineEventHandler,
  getQuery,
  H3Event,
  getCookie,
  setResponseHeader
} from 'h3'
import { createHandler, TidePageApi } from '@dpc-sdp/ripple-tide-api'
import { BadRequestError } from '@dpc-sdp/ripple-tide-api/errors'
import { useNitroApp } from '#imports'
import {
  isPreviewPath,
  AuthCookieNames
} from '@dpc-sdp/nuxt-ripple-preview/utils'

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

    const tokenCookie = getCookie(event, AuthCookieNames.ACCESS_TOKEN)
    const headers = {}

    // Only add the access token to the headers if the path is a preview path
    if (isPreviewPath(query.path)) {
      headers['X-OAuth2-Authorization'] = `Bearer ${tokenCookie}`
    }

    const pageResponse = await tidePageApi.getPageByPath(
      query.path,
      query.site,
      {},
      headers
    )

    // Need to pass on the section cache tags to the nuxt app
    if (pageResponse.headers) {
      setResponseHeader(
        event,
        'section-cache-tags',
        pageResponse.headers['section-cache-tags']
      )
    }

    return pageResponse.data
  })
}

export default defineEventHandler(async (event: H3Event) => {
  const nitroApp = useNitroApp()
  return createPageHandler(event, nitroApp.tide.pageApi)
})
