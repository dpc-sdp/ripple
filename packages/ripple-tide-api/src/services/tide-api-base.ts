import HttpClient from './http-client.js'
import { get } from 'lodash-es'
import type { RplTideModuleConfig } from './../../types'
import getHierarchicalMenu from './lib/site-menu.js'
import { ApplicationError, WrappedAxiosError } from '../errors/errors.js'
import axios from 'axios'
import { ILogger } from '../logger/logger'

export default class TideApiBase extends HttpClient {
  tide: RplTideModuleConfig
  debug: boolean | undefined
  constructor(tide: RplTideModuleConfig, logger: ILogger) {
    if (!tide) {
      throw new Error('Error - No configuration specified')
    }
    super(
      {
        client: tide.client,
        baseUrl: `${tide.baseUrl}${tide.config?.apiPrefix}`,
        auth: tide.config?.auth
      },
      logger
    )
    this.tide = tide
    this.debug = tide.debug
  }

  async getMappedDataAux(mapping = {}, resource = {}) {
    const data = {}
    for (const key in mapping) {
      if (mapping.hasOwnProperty(key)) {
        const resolver = mapping[key]
        if (typeof resolver === 'string' || Array.isArray(resolver)) {
          data[key] = get(resource, resolver)
        } else if (resolver.constructor.name === 'AsyncFunction') {
          data[key] = await resolver(resource, this)
        } else if (typeof resolver === 'function') {
          const resolveFn = resolver.bind(this)
          data[key] = resolveFn(resource)
        } else if (typeof resolver === 'object') {
          data[key] = await this.getMappedDataAux(resolver, resource)
        }
      }
    }
    return data
  }

  async getMappedData(mapping = {}, resource = {}) {
    if (!mapping || !resource) {
      throw new ApplicationError(
        `Unable to retrieve data from mapping "${mapping}"`
      )
    }

    try {
      return await this.getMappedDataAux(mapping, resource)
    } catch (error) {
      throw new ApplicationError(
        `An error occurred while mapping tide API data`,
        {
          cause: error
        }
      )
    }
  }

  async get(url: string, config = {}): Promise<any> {
    try {
      return await this.client.get(url, { ...config })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new WrappedAxiosError(error.message, error)
      } else {
        throw error
      }
    }
  }

  async getSiteMenu(siteId, menuData, activePath = null) {
    if (!menuData) {
      return null
    }

    const menuName = menuData.drupal_internal__id

    // If a site opts into the old paginated menu style we make several requests to get all the links then build the menu
    // this "paginated" method can be removed once all sites are using the new "single" menu endpoint added v3.0.10 of tide_api
    if (this.tide?.menuEndpoint === 'paginated') {
      return await this.getPaginatedMenu(siteId, menuName, activePath)
    }

    return await this.getCompleteMenu(siteId, menuName, activePath)
  }

  async getCompleteMenu(siteId, menuName, activePath) {
    const params = {
      site: siteId,
      filter: {
        max_depth: 4,
        fields: 'title,url,parent,weight'
      }
    }

    try {
      const menusResponse = await this.get(`/menu_items/${menuName}`, {
        params
      })

      if (menusResponse?.data) {
        return getHierarchicalMenu(menusResponse.data, activePath)
      }
    } catch (error) {
      throw new ApplicationError(
        `Error fetching menu with name "${menuName}"`,
        { cause: error }
      )
    }
  }

  async getPaginatedMenu(siteId, menuName, activePath) {
    try {
      const menusResponse = await this.getAllPaginatedMenuLinks(
        siteId,
        menuName
      )

      if (menusResponse) {
        return getHierarchicalMenu(menusResponse, activePath, true)
      }
    } catch (error) {
      throw new ApplicationError(
        `Error fetching menu with name "${menuName}"`,
        { cause: error }
      )
    }
  }

  async getAllPaginatedMenuLinks(siteId, menuName) {
    // Get the first page of links, this will also give us a link to the next page
    let response = await this.get(
      '/menu_link_content/menu_link_content?site=' + siteId,
      {
        params: {
          filter: {
            menu_link_content: {
              path: 'menu_name',
              value: menuName
            }
          }
        }
      }
    )

    let menuLinks = [...response.data]

    // FIXME - For local dev, return only the first page of the results otherwise development
    // is slowed down to a crawl
    if (process.env.DISABLE_MENU_PAGINATION) {
      return menuLinks
    }

    // Get the rest of the menu links by following their 'next' link until a response has no next link
    while (response?.links?.next) {
      response = await this.get(response.links.next.href)
      menuLinks = [...menuLinks, ...response.data]
    }

    return menuLinks
  }
}
