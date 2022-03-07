import jsonapiParse from 'jsonapi-parse'
import TideApiBase from './tide-api-base'
import getHierarchicalMenu from './lib/site-menu'
import type { RplTideModuleConfig, RplTideMapping } from './../../types'

export default class TideSite extends TideApiBase {
  site: string
  siteMapping: RplTideMapping
  constructor(config: RplTideModuleConfig) {
    super(config)
    this.site = config.contentApi.site
    if (typeof config?.mapping?.site === 'string') {
      throw new Error('Error loading site mapping')
    }
    this.siteMapping = config?.mapping?.site
  }
  async getSiteData(siteid) {
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
      this.handleError('Error fetching site data' + error.message, 500)
    }
  }

  async getSiteMenus(siteData, fields) {
    const menus = {}
    const siteId = siteData.drupal_internal__tid || this.site
    const menuFields = Object.keys(fields)
    for (let k = 0; k < menuFields.length; k++) {
      const key = menuFields[k]
      const menuData = siteData[fields[key]]
      if (menuData) {
        const menuName = menuData.drupal_internal__id
        const params = {
          filter: {
            menu_link_content: {
              path: 'menu_name',
              value: menuName
            }
          }
        }
        try {
          const menusResponse = await this.get(
            '/menu_link_content/menu_link_content?site=' + siteId,
            { params }
          )
          // TODO : Get paginated links
          if (menusResponse) {
            const menuItemsData = menusResponse.data
            menus[key] = menuItemsData
          }
        } catch (error) {
          return Promise.reject(this.handleError(error))
        }
      }
    }
    try {
      const hierarchicalMenus = getHierarchicalMenu(menus)
      return hierarchicalMenus
    } catch (error) {
      return Promise.reject(this.handleError(error))
    }
  }
}
