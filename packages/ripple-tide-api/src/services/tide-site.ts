import jsonapiParse from 'jsonapi-parse'
import TideApiBase from './tide-api-base.js'
import type { RplTideModuleConfig, RplTideMapping } from './../../types'
import { ApplicationError } from '../errors/errors.js'
import { ILogger } from '../logger/logger'

export default class TideSite extends TideApiBase {
  site: string
  siteMapping: RplTideMapping

  constructor(config: RplTideModuleConfig, logger: ILogger) {
    super(config, logger)
    this.site = config.contentApi.site
    if (typeof config?.mapping?.site === 'string') {
      throw new Error('Error loading site mapping')
    }
    this.siteMapping = config?.mapping?.site
    this.logLabel = 'TideSite'
  }

  async getSiteData(siteid) {
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
