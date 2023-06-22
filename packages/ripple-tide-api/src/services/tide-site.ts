import jsonapiParse from 'jsonapi-parse'
import TideApiBase from './tide-api-base.js'
import type { RplTideModuleConfig, IRplTideModuleMapping } from './../../types'
import { ApplicationError } from '../errors/errors.js'
import { ILogger } from '../logger/logger'

export default class TideSite extends TideApiBase {
  site: string
  siteMapping: IRplTideModuleMapping | null

  constructor(tide: RplTideModuleConfig, logger: ILogger) {
    super(tide, logger)
    this.site = tide.site
    this.siteMapping = null
    this.logLabel = 'TideSite'
  }

  setSiteMapping(siteMapping) {
    this.siteMapping = siteMapping
  }

  async getSiteData(siteid) {
    if (!this.siteMapping) {
      throw new Error('Error loading site mapping')
    }
    const include = this.siteMapping.includes
    const params = {
      include: include.toString(),
      site: siteid
    }
    if (/\d/.test(siteid)) {
      params['filter'] = {
        drupal_internal__tid: siteid
      }
    } else {
      params['filter'] = {
        name: siteid
      }
    }
    try {
      const response = await this.get(`/taxonomy_term/sites`, { params })
      if (response && response.data.length > 0) {
        const resource = jsonapiParse.parse(response).data[0]
        const siteData = await this.getMappedData(
          this.siteMapping.mapping,
          resource
        )
        return siteData
      }
    } catch (error: any) {
      throw new ApplicationError('Error fetching site data', { cause: error })
    }
  }
}
