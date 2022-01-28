import jsonapiParse from 'jsonapi-parse'
import TideApi from './tide-api.js'
import getHierarchicalMenu from './utils/hierarchical-menu.js'

export default class TideSite extends TideApi {
  constructor (config) {
    super(config)
    this.site = config.site
    this.siteMapping = config.siteMapping
  }
  async getSiteData (siteid) {
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

  async getSiteMenus (siteData, fields) {
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
