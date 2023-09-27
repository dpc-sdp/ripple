import jsonapiParse from 'jsonapi-parse'
import { defineEventHandler, getQuery, H3Event } from 'h3'
import { createHandler, TideApiBase, logger } from '@dpc-sdp/ripple-tide-api'
import {
  ApplicationError,
  BadRequestError
} from '@dpc-sdp/ripple-tide-api/errors'
import type {
  RplTideModuleConfig,
  IRplTideModuleMapping,
  ILogger
} from '@dpc-sdp/ripple-tide-api/types'
import type { indexNode, apiNode } from '../../../types'
import { useRuntimeConfig } from '#imports'

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

  async getPublicationMenu(id: string) {
    try {
      const { data: response } = await this.get(
        `/node/publication/${id}/hierarchy`,
        {
          params: { site: this.siteId }
        }
      )
      const resource = jsonapiParse.parse(response).data.meta.hierarchy
      const siteData = await this.getMappedData(
        this.publicationMapping.mapping,
        resource
      )
      return siteData
    } catch (error: any) {
      // Could be 404?
      throw new ApplicationError('Error fetching publication index', {
        cause: error
      })
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

    return await publicationIndexApi.getPublicationMenu(query.id)
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
