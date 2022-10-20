import jsonapiParse from 'jsonapi-parse'
import TideApiBase from './tide-api-base.js'
import defaultMapping from './lib/default-mapping.js'
import type { RplTideModuleConfig } from './../../types'
export default class TidePage extends TideApiBase {
  contentTypes: object
  site: string
  sectionId: string
  path: string

  constructor(config: RplTideModuleConfig) {
    super(config)
    this.site = config.contentApi.site
    this.sectionId = ''
    this.path = ''
    this.contentTypes = config.mapping.content
  }

  async getRouteByPath(path: string, site: string = this.site) {
    this.path = path

    const routeUrl = `/route?site=${site}&path=${path}`
    return this.get(routeUrl)
      .then((response) => response?.data?.attributes)
      .catch((error) => {
        return Promise.reject(
          this.handleError(
            `Error: ${error.response?.status} `,
            error.response?.status
          )
        )
      })
  }

  async getPageByPath(
    path: string,
    siteQuery: string | undefined,
    config = {}
  ) {
    try {
      // if (this.isShareLink(path)) {
      //   return this.getPageFromShareLink(path, config)
      // }
      // if (this.isPreviewLink(path)) {
      //   return this.getPageFromPreviewLink(path, config)
      // }
      const site = siteQuery || this.site
      const route = await this.getRouteByPath(path, site)
      if (route && !route.error) {
        if (route.hasOwnProperty('redirect_type')) {
          return {
            type: 'redirect',
            ...route
          }
        }
        const includes = this.getResourceIncludes(route.bundle)
        const params = {
          site,
          ...config
        }
        if (includes !== '') {
          params['include'] = includes
        }
        return this.getPageByRouteData(route, { params })
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

  getResourceIncludes(type: string) {
    const includes = this.contentTypes[type]
      ? this.contentTypes[type].includes
      : []
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
        // The route response has a 'section' attribute, which is the site id used to
        // determine which menu appears in the 'site section navigation'
        // We capture it here so that it can be used in the mapping functions
        this.sectionId = route.section

        const nodeUrl = `/${route.entity_type}/${route.bundle}/${route.uuid}`
        return this.get(nodeUrl, config)
          .then((response) => {
            if (response.data) {
              const data = jsonapiParse.parse(response).data || response.data
              return this.getTidePage(data, route.bundle)
            }
            return response
          })
          .catch((error) => {
            return Promise.reject(
              this.handleError('', error.response?.status | 404)
            )
          })
      }
      throw this.handleError('Invalid route')
    } catch (error: any) {
      return Promise.reject(
        this.handleError(
          'Application Error - getPageByRouteData',
          error.response?.status || 500
        )
      )
    }
  }

  async getTaxonomyItems(taxonomyName, config) {
    try {
      const url = `/taxonomy_term/${taxonomyName}`
      return this.client.get(url, config).then((response) => {
        if (response.data) {
          const data = jsonapiParse.parse(response).data || response.data
          return data
        }
        return response
      })
    } catch (error: any) {
      return Promise.reject(
        this.handleError('Application Error - getTaxonomyItems', 500)
      )
    }
  }

  async getTidePage(resource, type) {
    if (this.debug) {
      defaultMapping.mapping['_source'] = (src) => src
    }
    const contentTypeMapping =
      this.contentTypes[type] &&
      this.contentTypes[type].hasOwnProperty('mapping') &&
      this.contentTypes[type].mapping
    if (!contentTypeMapping) {
      return Promise.reject(
        this.handleError('Unable to resolve content type - ' + type, 500)
      )
    }
    return this.getMappedData(
      { ...defaultMapping.mapping, ...contentTypeMapping },
      resource
    )
  }
  getResourceType(type) {
    return type.replace('node--', '')
  }
}
