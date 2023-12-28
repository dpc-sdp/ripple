import jsonapiParse from 'jsonapi-parse'
import { defineEventHandler, getQuery, H3Event } from 'h3'
import { createHandler, TideApiBase, logger } from '@dpc-sdp/ripple-tide-api'
import { BadRequestError } from '@dpc-sdp/ripple-tide-api/errors'
import type {
  RplTideModuleConfig,
  IRplTideModuleMapping,
  ILogger
} from '@dpc-sdp/ripple-tide-api/types'
import type { indexNode, apiNode } from '../../../types'
import { useRuntimeConfig } from '#imports'
import { AuthCookieNames } from '@dpc-sdp/nuxt-ripple-preview/utils'

/**
 * @description Recursively transform API response to match component props
 */
const processChildren = (node: apiNode) => {
  const returnNode: indexNode = {
    text: node.title,
    url: node.url,
    id: node.id,
    items: node.children ? [] : undefined,
    active: undefined
  }
  if (node.children) {
    node.children.map((child: apiNode) => {
      returnNode.items?.push(processChildren(child))
    })
  }
  return returnNode
}

/**
 * @description Custom API call methods and response mapping for publication index
 */
class TidePublicationIndexApi extends TideApiBase {
  siteId: string
  publicationMapping: IRplTideModuleMapping
  logLabel: string

  constructor(tide: RplTideModuleConfig, logger: ILogger) {
    super(tide, logger)
    this.siteId = tide.site
    this.publicationMapping = {
      mapping: {
        _src: (src: any) =>
          process.env.NODE_ENV === 'development' ? src : undefined,
        publication: (src: apiNode) => processChildren(src)
      },
      includes: []
    }
    this.logLabel = 'TidePublicationIndex'
  }

  async getPublicationMenu(id: string, headers = {}) {
    try {
      const { data: response } = await this.get(
        `/node/publication/${id}/hierarchy`,
        {
          params: { site: this.siteId },
          headers
        }
      )
      const resource = jsonapiParse.parse(response).data.meta.hierarchy
      const siteData = await this.getMappedData(
        this.publicationMapping.mapping,
        resource
      )
      return siteData
    } catch (error: any) {
      // Could be 404? publication could be in share or preview so need to ignore this error and render page anyway
      logger.error(`Error fetching publication index`, error)
    }
  }
}

export const createPublicationIndexHandler = async (
  event: H3Event,
  publicationIndexApi: TidePublicationIndexApi
) => {
  return createHandler(event, 'PublicationIndexHandler', async () => {
    const query: any = await getQuery(event)

    if (!query.id) {
      throw new BadRequestError('Publication ID is required')
    }

    const tokenCookie = getCookie(event, AuthCookieNames.ACCESS_TOKEN)
    const accessTokenExpiry = parseFloat(
      getCookie(event, AuthCookieNames.ACCESS_TOKEN_EXPIRY)
    )
    const isTokenExpired = accessTokenExpiry
      ? accessTokenExpiry < Date.now()
      : true

    const headers = {}

    if (tokenCookie && !isTokenExpired) {
      headers['X-OAuth2-Authorization'] = `Bearer ${tokenCookie}`
    }

    return await publicationIndexApi.getPublicationMenu(query.id, headers)
  })
}

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const publicationIndexApi = new TidePublicationIndexApi(
    { ...config.public.tide, ...config.tide },
    logger
  )

  event.context.tide = {
    publicationIndexApi
  }

  return createPublicationIndexHandler(
    event,
    event.context.tide.publicationIndexApi
  )
})
