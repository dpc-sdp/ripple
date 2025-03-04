//@ts-nocheck runtime imports
import jsonapiParse from 'jsonapi-parse'
import { defineEventHandler, getCookie, getQuery, H3Event } from 'h3'
import { createHandler, TideApiBase, logger } from '@dpc-sdp/ripple-tide-api'
import { BadRequestError } from '@dpc-sdp/ripple-tide-api/errors'
import type {
  RplTideModuleConfig,
  IRplTideModuleMapping,
  ILogger
} from '@dpc-sdp/ripple-tide-api/types'
import { useNitroApp, useRuntimeConfig } from '#imports'
import { AuthCookieNames } from '@dpc-sdp/nuxt-ripple-preview/utils'
import { getFormSchemaFromMapping, getCaptchaSettings } from '../../../mapping'

/**
 * @description Custom API call methods and response mapping for webform
 */
export class TideWebformApi extends TideApiBase {
  webformMapping: IRplTideModuleMapping
  declare logLabel: string

  constructor(tide: RplTideModuleConfig, logger: ILogger) {
    super(tide, logger)

    const nitroApp = useNitroApp()

    this.webformMapping = {
      mapping: {
        _src: (field: any) =>
          process.env.NODE_ENV === 'development' ? field : undefined,
        schema: async (field: any, page: any) =>
          await getFormSchemaFromMapping(field, page, nitroApp?.tide?.pageApi),
        captchaConfig: (field: any) => getCaptchaSettings(field)
      },
      includes: []
    }
    this.logLabel = 'TideWebform'
  }

  async getWebform(id: string, headers = {}) {
    try {
      // /webform/webform/${id}
      // /webform/webform?filter[drupal_internal__id]=${id}
      const { data: response } = await this.get(
        `/webform/webform?filter[drupal_internal__id]=${id}`,
        {
          headers
        }
      )
      const resource = jsonapiParse.parse(response).data[0]
      const siteData = await this.getMappedData(
        this.webformMapping.mapping,
        resource
      )
      return siteData
    } catch (error: any) {
      // Could be 404? webform could be in share or preview so need to ignore this error and render page anyway
      logger.error(`Error fetching webform`, error)
    }
  }
}

export const createWebformHandler = async (
  event: H3Event,
  webformApi: TideWebformApi
) => {
  return createHandler(event, 'WebformHandler', async () => {
    const query: any = await getQuery(event)

    if (!query.id) {
      throw new BadRequestError('Webform ID is required')
    }

    const tokenCookie = getCookie(event, AuthCookieNames.ACCESS_TOKEN)
    const accessTokenExpiry = parseFloat(
      getCookie(event, AuthCookieNames.ACCESS_TOKEN_EXPIRY) || ''
    )
    const isTokenExpired = accessTokenExpiry
      ? accessTokenExpiry < Date.now()
      : true

    const headers: any = {}

    if (tokenCookie && !isTokenExpired) {
      headers['X-OAuth2-Authorization'] = `Bearer ${tokenCookie}`
    }

    return await webformApi.getWebform(query.id, headers)
  })
}

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const webformApi = new TideWebformApi(
    { ...(config.public.tide as any), ...(config.tide as any) },
    logger
  )

  event.context.tide = {
    webformApi
  }

  return createWebformHandler(event, event.context.tide.webformApi)
})
