import jsonapiParse from 'jsonapi-parse'
import TideApi from './tide-api'
import { RippleTideApiConfig, Mapping, RippleTideApiModule } from './../create-server'
import defaultMapping from './utils/default-mapping'

export default class TidePage extends TideApi {
  modules: Array<Mapping>
  constructor(config: RippleTideApiConfig) {
    super(config)
    this.modules = config.modules
  }

  async getRouteByPath(path: String, site: string|number = 4): Promise<any> {
    const routeUrl = `/route?site=${site}&path=${path}`
    return this.client
      .get(routeUrl)
      .then(response => this.utils.get(response, 'data.attributes'))
      .catch(error => {
        return Promise.reject(this.handleError(`Error: ${error.response.status} `, error.response.status))
      })
  }

  async getPageByPath(path, config = { params: {} }): Promise<any> {
    try {
      // if (this.isShareLink(path)) {
      //   return this.getPageFromShareLink(path, config)
      // }
      // if (this.isPreviewLink(path)) {
      //   return this.getPageFromPreviewLink(path, config)
      // }

      const route = await this.getRouteByPath(path)
      if (route && !route.error) {
        if (route.hasOwnProperty('redirect_type')) {
          return {
            type: 'redirect',
            ...route
          }
        }

        return this.getPageByRouteData(route, {
          params: {
            ...config.params,
            include: this.getResourceIncludes(route.bundle)
          }
        })
      }
      return Promise.reject(route)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // async getPageFromShareLink(path, config = { params: {} }): Promise<any> {
  //   const shareLinkData = await this.client.get(path).then(response => {
  //     if (response.data) {
  //       return jsonapiParse.parse(response).data || response.data
  //     }
  //     return response
  //   })
  //   if (shareLinkData) {
  //     const sharedNode = shareLinkData.shared_node
  //     const routeData = {
  //       entity_type: 'node',
  //       bundle: sharedNode.type.replace('node--', ''),
  //       uuid: sharedNode.id
  //     }
  //     const pageData = await this.getPageByRouteData(routeData, {
  //       headers: {
  //         'X-Share-Link-Token': shareLinkData.id
  //       },
  //       params: {
  //         ...config.params,
  //         include: this.getResourceIncludes(routeData.bundle)
  //       }
  //     })
  //     return Promise.resolve(pageData)
  //   }
  // }

  // async getPageFromPreviewLink(path, config = { params: {} }): Promise<any> {
  //   const { 2: contentType, 3: uuid, 4: revisionId } = path.split('/')
  //   const routeData = {
  //     entity_type: 'node',
  //     bundle: contentType,
  //     uuid: uuid
  //   }
  //   const resourceVersion =
  //     revisionId === 'latest' ? 'rel:working-copy' : `id:${revisionId}`

  //   if (config.headers['x-oauth2-authorization']) {
  //     try {
  //       const pageData = await this.getPageByRouteData(routeData, {
  //         headers: {
  //           'x-oauth2-authorization': config.headers['x-oauth2-authorization']
  //         },
  //         params: {
  //           ...config.params,
  //           site: 4,
  //           resourceVersion,
  //           include: this.getResourceIncludes(routeData.bundle)
  //         }
  //       })
  //       return Promise.resolve(pageData)
  //     } catch (error) {
  //       return Promise.reject(
  //         this.handleError(
  //           { message: 'Unauthorized', error },
  //           (error.response && error.response.status) || 401
  //         )
  //       )
  //     }
  //   }
  //   return Promise.reject(this.handleError({ message: 'Unauthorized' }, 401))
  // }

  getResourceIncludes(type) {
    const includes = this.modules[type] ? this.modules[type].includes : []
    if (
      defaultMapping &&
      Array.isArray(defaultMapping.includes) &&
      defaultMapping.includes.length > 0
    ) {
      includes.push(...defaultMapping.includes)
    }
    return includes ? includes.toString() : ''
  }

  isShareLink(route) {
    if (typeof route !== 'string') {
      return false
    }
    return route.indexOf('/share_link/') === 0
  }

  isPreviewLink(route) {
    if (typeof route !== 'string') {
      return false
    }
    return route.indexOf('/preview/') === 0
  }

  async getPageByRouteData(route, config) {
    try {
      if (route && route.entity_type && route.bundle && route.uuid) {
        const nodeUrl = `/${route.entity_type}/${route.bundle}/${route.uuid}`
        return this.client
          .get(nodeUrl, config)
          .then(response => {
            if (response.data) {
              const data = jsonapiParse.parse(response).data || response.data
              return this.getTidePage(data, route.bundle)
            }
            return response
          })
          .catch(error => {
            return Promise.reject(this.handleError({}, error.response.status))
          })
      }
      throw this.handleError('Invalid route')
    } catch (error) {
      return Promise.reject(
        this.handleError(
          { message: 'Application Error - getPageByRouteData', error },
          error.response.status || 500
        )
      )
    }
  }

  async getTaxonomyItems(taxonomyName, config) {
    try {
      const url = `/taxonomy_term/${taxonomyName}`
      return this.client.get(url, config).then(response => {
        if (response.data) {
          const data = jsonapiParse.parse(response).data || response.data
          return data
        }
        return response
      })
    } catch (error) {
      return Promise.reject(
        this.handleError(
          { message: 'Application Error - getTaxonomyItems', error },
          error.response.status || 500
        )
      )
    }
  }

  async getTidePage(resource, type) {
    if (this.debug) {
      defaultMapping.mapping._source = src => src
    }
    const moduleMapping =
      this.modules[type] &&
      this.modules[type].hasOwnProperty('mapping') &&
      this.modules[type].mapping
    if (!moduleMapping) {
      return Promise.reject(
        this.handleError({ message: 'Unable to resolve module - ' + type })
      )
    }
    return this.getMappedData({ ...defaultMapping.mapping, ...moduleMapping }, resource)
  }
  getResourceType (type) {
    return type.replace('node--', '')
  }
}
