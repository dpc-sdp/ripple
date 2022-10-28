import HttpClient from './http-client.js'
import Logger from './lib/api-logger.js'
import { get } from 'lodash-es'
import type { RplTideModuleConfig } from './../../types'
import getHierarchicalMenu from './lib/site-menu.js'

export default class TideApiBase extends HttpClient {
  debug: boolean | undefined
  logger: Logger
  constructor(config: RplTideModuleConfig) {
    if (!config) {
      throw new Error('Error - No configuration specified')
    }
    super({
      client: config.client,
      baseUrl: `${config.contentApi.baseUrl}${config.contentApi.apiPrefix}`,
      auth: config.contentApi.auth
    })
    this.debug = config.debug
    this.logger = new Logger()
  }

  async getMappedData(mapping = {}, resource = {}) {
    if (!mapping || !resource) {
      this.handleError(
        'Error: Unable to retrieve data from mapping' + mapping,
        500
      )
    }
    const data = {}
    for (const key in mapping) {
      try {
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
            data[key] = await this.getMappedData(resolver, resource)
          }
        }
      } catch (error) {
        console.log(key, error)
      }
    }
    return data
  }

  async get(url: string, config = {}): Promise<any> {
    if (this.debug) {
      this.logger.info(
        `Req - ${this.client.defaults.baseURL}${this.client.getUri({
          url,
          ...config
        })}`
      )
    }
    return this.client.get(url, { ...config })
  }

  getErrorMessage(status: number) {
    switch (status) {
      case 404:
      case 403:
        return 'Page not found'
      case 401:
        return 'Unauthorized'
      case 400:
        return 'Bad request'
      case 503:
      case 500:
        return 'Server is not available'
      default:
        return 'Error fetching data'
    }
  }

  handleError(msg = 'error', status = 500) {
    if (this.debug) {
      if (status === 404) {
        this.logger.info(this.getErrorMessage(status))
      } else {
        this.logger.error(msg)
      }
    }
    const getReturnStatus = (code: number) => {
      switch (code) {
        // obscure 403 errors to prevent leaking existence of secure pages
        case 404:
        case 403:
          return 404
        default:
          return code
      }
    }
    return {
      status: getReturnStatus(status),
      message: this.getErrorMessage(status),
      debug: this.debug && msg // only return debug info if enabled
    }
  }

  async getSiteMenu(siteId, menuData, activePath?) {
    if (menuData) {
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
        return Promise.reject(this.handleError('Error fetching site menus'))
      }
    }
  }

  async getAllPaginatedMenuLinks(siteId, menuName) {
    try {
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
        try {
          response = await this.get(response.links.next.href)
          menuLinks = [...menuLinks, ...response.data]
        } catch (error) {
          this.logger.error('Failed to get next page data')
          throw error
        }
      }

      return menuLinks
    } catch (error) {
      return Promise.reject(this.handleError('Error fetching menu links'))
    }
  }
}
