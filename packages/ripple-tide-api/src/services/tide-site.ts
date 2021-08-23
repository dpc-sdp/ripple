import jsonapiParse from 'jsonapi-parse'
import TideApi from './tide-api'
import { RippleTideApiConfig } from './../create-server'
export default class TideSite extends TideApi {
  site: number;
  siteMapping: RippleTideApiConfig;

  constructor (config: RippleTideApiConfig) {
    super(config)
    this.site = config.site
    this.siteMapping = config.siteMapping
  }
  public async getSiteData (siteid: string) : Promise<any> {
    if (!siteid) {
      this.handleError('Error: No site id', 400)
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
      const response = await this.client.get(`/taxonomy_term/sites`, { params })
      if (response) {
        const resource = jsonapiParse.parse(response).data[0]
        const siteData = await this.getMappedData(
          this.siteMapping.mapping,
          resource
        )
        return siteData
      }
    } catch (error) {
      console.log(error)
      this.handleError('Error fetching site data' + error.message, 500)
    }
  }
}
