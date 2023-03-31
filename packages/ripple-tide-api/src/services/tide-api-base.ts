import HttpClient from './http-client.js'
import { get } from 'lodash-es'
import type { RplTideModuleConfig } from './../../types'
import getHierarchicalMenu from './lib/site-menu.js'
import { ApplicationError, WrappedAxiosError } from '../errors/errors.js'
import axios from 'axios'
import { ILogger } from '../logger/logger'

export default class TideApiBase extends HttpClient {
  debug: boolean | undefined
  constructor(tide: RplTideModuleConfig, logger: ILogger) {
    if (!tide) {
      throw new Error('Error - No configuration specified')
    }
    super(
      {
        client: tide.client,
        baseUrl: `${tide.baseUrl}${tide.config.apiPrefix}`,
        auth: tide.config.auth
      },
      logger
    )
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

  async getSiteMenu(siteId, menuData, activePath?) {
    if (!menuData) {
      return null
    }

    const menuName = menuData.drupal_internal__id

    try {
      const menusResponse = await this.get(`/menu_items/${menuName}`)

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
}
