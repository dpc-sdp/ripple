//@ts-nocheck import typing needs fixing
import jsonapiParse from 'jsonapi-parse'
import { defineEventHandler, getQuery, CompatibilityEvent } from 'h3'
import {
  createHandler,
  defineRplTideModule,
  TideApiBase,
  ApplicationError,
  logger
} from '@dpc-sdp/ripple-tide-api'
import type {
  RplTideModuleConfig,
  RplTideMapping,
  ILogger
} from '@dpc-sdp/ripple-tide-api/types'
import type { indexNode, apiNode } from './types'
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
  publicationMapping: RplTideMapping

  constructor(config: RplTideModuleConfig, logger: ILogger) {
    super(config, logger)
    this.siteId = config.contentApi.site
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
      const response = await this.get(`/node/publication/${id}/hierarchy`, {
        params: { site: this.siteId }
      })
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

// Export server handler for nuxt
export default defineEventHandler(async (event: CompatibilityEvent) => {
  const {
    public: { tide: tideConfig }
  } = useRuntimeConfig()
  const rplTideModules = await defineRplTideModule(tideConfig)
  const publicationIndexApi = new TidePublicationIndexApi(
    {
      ...tideConfig,
      mapping: rplTideModules
    },
    logger
  )

  event.context.tide = {
    publicationIndexApi
  }

  return createHandler(event, 'PublicationIndexHandler', async () => {
    const query: any = await getQuery(event)

    if (!query.id) {
      throw new BadRequestError('Publication id is required')
    }

    return await publicationIndexApi.getPublicationMenu(query.id)
  })
})
