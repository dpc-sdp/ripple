import jsonapiParse from 'jsonapi-parse'
import TideApiBase from './tide-api-base.js'
import { default as PublicationIndexMapping } from '../mapping/publication-index.js'
import type { RplTideModuleConfig, RplTideMapping } from './../../types'
import { ApplicationError } from '../errors/errors.js'
import { ILogger } from '../logger/logger'

export default class TidePublicationIndex extends TideApiBase {
  siteId: string
  publicationMapping: RplTideMapping

  constructor(config: RplTideModuleConfig, logger: ILogger) {
    super(config, logger)
    this.siteId = config.contentApi.site
    this.publicationMapping = PublicationIndexMapping
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
