import HttpClient from './http-client.js'
import { get } from 'lodash-es'
import type { RplTideModuleConfig } from './../../types'
import getHierarchicalMenu from './lib/site-menu.js'
import { ApplicationError, WrappedAxiosError } from '../errors/errors.js'
import axios from 'axios'
import { ILogger } from '../logger/logger'

export default class TideApiBase extends HttpClient {
  debug: boolean | undefined
  constructor(config: RplTideModuleConfig, logger: ILogger) {
    if (!config) {
      throw new Error('Error - No configuration specified')
    }
    super(
      {
        client: config.client,
        baseUrl: `${config.contentApi.baseUrl}${config.contentApi.apiPrefix}`,
        auth: config.contentApi.auth
      },
      logger
    )
    this.debug = config.debug
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

  async getSiteMenu(siteId, menuData, activePath?) {
    if (!menuData) {
      return null
    }

    const menuName = menuData.drupal_internal__id

    try {
      const menusResponse = await this.getAllPaginatedMenuLinks(
        siteId,
        menuName
      )

      if (menusResponse) {
        const menu = menusResponse
        return getHierarchicalMenu(menu, activePath)
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
