import jsonapiParse from 'jsonapi-parse'
import TideApiBase from './tide-api-base.js'
import defaultMapping from './lib/default-mapping.js'
import type {
  RplTideModuleConfig,
  IRplTideModuleMapping,
  IRplTideDynamicComponentMapping
} from './../../types'
import { ApplicationError, NotFoundError } from '../errors/errors.js'
import { ILogger } from '../logger/logger'
import { defu as defuMerge } from 'defu'

export default class TidePageApi extends TideApiBase {
  contentTypes: {
    [key: string]: IRplTideModuleMapping
  }
  dynamicComponents: {
    [key: string]: IRplTideDynamicComponentMapping
  }
  site: string

  constructor(tide: RplTideModuleConfig, logger: ILogger) {
    super(tide, logger)
    this.site = tide.site
    this.contentTypes = {}
    this.dynamicComponents = {}
    this.logLabel = 'TidePage'
  }

  setContentType(key, value) {
    if (!this.contentTypes[key]) {
      this.contentTypes[key] = value
    } else {
      this.contentTypes[key] = defuMerge(value, this.contentTypes[key])
    }
  }

  setDynamicComponent(key, cmp: IRplTideDynamicComponentMapping) {
    if (this.dynamicComponents.hasOwnProperty(key)) {
      this.logger.debug(`Replacing ${key} component which has already been set`)
    }
    this.dynamicComponents[key] = cmp
  }

  getDynamicComponent(k: string) {
    return this.dynamicComponents[k]
  }

  async getDynamicPageComponents(pageData, componentFieldPath) {
    const componentFields = pageData[componentFieldPath]
    const mappedComponents: Record<string, any>[] = []

    if (componentFields && Array.isArray(componentFields)) {
      for (let i = 0; i < componentFields.length; i++) {
        const cmpData = componentFields[i]

        const componentConfig = this.getDynamicComponent(cmpData.type)
        if (!componentConfig) {
          this.logger.error(`Component ${cmpData.type} mapping not found`)
          continue
        }
        const componentMapping = componentConfig.mapping
        if (componentMapping.constructor.name === 'AsyncFunction') {
          const data = await componentMapping.apply(this, [
            cmpData,
            pageData,
            this
          ])
          mappedComponents.push({
            uuid: cmpData.uuid || cmpData.id,
            ...data
          })
        } else if (typeof componentMapping === 'function') {
          const data = componentMapping.apply(this, [cmpData, pageData, this])
          mappedComponents.push({
            uuid: cmpData.uuid || cmpData.id,
            ...data
          })
        }
      }

      return mappedComponents
    }
  }

  async getRouteByPath(
    path: string,
    site: string = this.site,
    headers = {},
    logId?: string
  ) {
    const routeUrl = `/route?site=${site}&path=${path}`

    return this.get(routeUrl, { headers, _logId: logId })
      .then((response) => response?.data?.data?.attributes)
      .catch((error) => {
        throw new NotFoundError(
          `Route for site "${site}" and path "${path}" not found`,
          {
            cause: error
          }
        )
      })
  }

  async getPageByPath(
    path: string,
    siteQuery: string | undefined,
    params = {},
    headers = {},
    logId?: string
  ) {
    const site = siteQuery || this.site

    if (this.isShareLink(path)) {
      return this.getPageByShareLink(path, site, logId)
    }

    if (this.isPreviewLink(path)) {
      return this.getPageFromPreviewLink(path, site, params, headers, logId)
    }

    const route = await this.getRouteByPath(path, site, headers, logId)
    if (route && !route.error) {
      if (route.hasOwnProperty('redirect_type')) {
        return {
          data: {
            type: 'redirect',
            ...route
          }
        }
      }
      const includes = this.getResourceIncludes(route)
      const fullParams = {
        site,
        ...params
      }
      if (includes !== '') {
        fullParams['include'] = includes
      }
      return this.getPageByRouteData(route, {
        params: fullParams,
        headers,
        _logId: logId
      })
    }
  }

  async getPageByShareLink(path: string, site: string, logId?: string) {
    const response = await this.get(path).then(({ data: res }) => {
      return res?.data ? jsonapiParse.parse(res).data || res.data : null
    })

    if (!response) {
      throw new ApplicationError('No data returned for share link')
    }

    const routeData = {
      entity_type: 'node',
      uuid: response.shared_node.id,
      bundle: response.shared_node.type.replace('node--', '')
    }

    const params: any = {
      site,
      include: this.getResourceIncludes(routeData)
    }

    if (response?.vid) {
      params.resourceVersion = `id:${response.vid}`
    }

    return await this.getPageByRouteData(routeData, {
      headers: { 'X-Share-Link-Token': response.id },
      params,
      _logId: logId
    })
  }

  async getPageFromPreviewLink(
    path,
    site,
    params = {},
    headers = {},
    logId?: string
  ): Promise<any> {
    try {
      const { 2: contentType, 3: uuid, 4: revisionId } = path.split('/')
      const routeData = {
        entity_type: 'node',
        bundle: contentType,
        uuid: uuid
      }

      const resourceVersion =
        revisionId === 'latest' ? 'rel:working-copy' : `id:${revisionId}`

      const fullParams: any = {
        ...params,
        site,
        include: this.getResourceIncludes(routeData),
        resourceVersion
      }

      return await this.getPageByRouteData(routeData, {
        headers,
        params: fullParams,
        _logId: logId
      })
    } catch (error) {
      throw new NotFoundError(`Couldn't get page preview`, {
        cause: error
      })
    }
  }

  getResourceIncludes(route) {
    const includes = [...this.getContentTypeField('includes', route)]

    // Get all the needed includes for this dynamic components that can appear in this content type
    const dynamicComponentIncludes = Object.values(
      this.dynamicComponents
    ).reduce((result, component: IRplTideDynamicComponentMapping): string[] => {
      if (component.contentTypes?.includes(route.bundle)) {
        return [...result, ...component.includes]
      }
      return result
    }, [] as string[])

    includes.push(...dynamicComponentIncludes)

    if (
      defaultMapping &&
      Array.isArray(includes) &&
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
    if (route && route.entity_type && route.bundle && route.uuid) {
      const nodeUrl = `/${route.entity_type}/${route.bundle}/${route.uuid}`

      return await this.get(nodeUrl, config).then(({ data, headers }) => {
        if (data.data) {
          const parsedData = jsonapiParse.parse(data).data || data.data

          return {
            data: this.getTidePage(parsedData, route),
            headers
          }
        }

        return {
          data,
          headers
        }
      })
    }
    throw new Error('Invalid route')
  }

  async getTidePage(resource, route) {
    if (this.debug) {
      defaultMapping.mapping['_source'] = (src) => src
    }
    const contentTypeMapping = this.getContentTypeField('mapping', route)
    if (!contentTypeMapping) {
      throw new ApplicationError(
        `Unable to resolve content type - ${route.bundle}`
      )
    }

    // The route response has a 'section' attribute, which is the site id used to
    // determine which menu appears in the 'site section navigation'
    // We capture it here so that it can be used in the mapping functions
    return this.getMappedData(
      { ...defaultMapping.mapping, ...contentTypeMapping },
      { ...resource, _sectionId: route.section }
    )
  }

  async getContentList(type: string, options: any = {}) {
    const params = {
      site: this.site,
      ...options
    }
    if (options?.include) {
      params.include = options.include.toString()
    }

    try {
      const { data: response } = await this.get(`/node/${type}`, {
        params
      })
      if (response) {
        return jsonapiParse.parse(response).data
      }
    } catch (error: any) {
      throw new ApplicationError(`Error fetching content list for ${type}`, {
        cause: error
      })
    }
  }

  async getEntityList(
    entityType,
    bundle,
    filtering?,
    includes?,
    pagination?,
    sorting?,
    { allPages = true } = {}
  ) {
    const params: Record<string, any> = {
      site: this.site
    }
    // docs: https://www.drupal.org/docs/8/modules/json-api/filtering
    if (filtering) {
      params.filter = filtering
    }
    // docs: https://www.drupal.org/docs/8/modules/json-api/includes
    if (includes) {
      params.include = includes.toString()
    }
    // docs: https://www.drupal.org/docs/8/modules/json-api/pagination
    if (pagination) {
      params.page = pagination
    }
    // docs: https://www.drupal.org/docs/8/modules/json-api/sorting
    if (sorting) {
      params.sort = sorting
    }
    try {
      // Give more time for list response, normally it's slow
      const { data: response } = await this.get(`${entityType}/${bundle}`, {
        params
      })

      if (allPages) {
        const allPagesData = await this.getAllPaginatedData(response)
        if (allPagesData instanceof Error) {
          throw allPagesData
        }
        return allPagesData
      } else {
        return jsonapiParse.parse(response).data
      }
    } catch (error) {
      throw new ApplicationError(
        `Failed to get a entity list from Tide API for "${entityType}:${bundle}"`,
        { cause: error }
      )
    }
  }

  /**
   * Used for get paginated response data
   * @param {*} response
   * @param {*} parse
   * @param {*} headersConfig
   * @returns {Object} a response data with all JSON:API pages or an instance of Error
   */
  async getAllPaginatedData(response, parse = true, headersConfig = {}) {
    let data = parse ? jsonapiParse.parse(response).data : response.data

    while (response.links && response.links.next) {
      const resource = this.jsonApiLinkToResource(response.links.next)

      this.logger.debug(`Tide get next page: ${resource}`)

      // Use getByURL directly here because resource url contains all query params.
      try {
        const { data: nextResponse } = await this.get(resource, {
          headers: headersConfig,
          site: this.site
        })
        response = nextResponse
        const nextData = parse
          ? jsonapiParse.parse(response).data
          : response.data
        data = data.concat(nextData)
      } catch (error) {
        throw new ApplicationError('Failed to get next page data', {
          cause: error
        })
      }
    }
    return data
  }

  // Extract api resource url from a full url from API response
  // e.g 'http://exmaple.com/api/v1/node/page?site=4...' => 'node/page?site=4...'
  jsonApiLinkToResource(jsonApiLink, apiPrefix = '/api/v1') {
    if (typeof jsonApiLink !== 'string') {
      jsonApiLink = jsonApiLink.href
    }
    const url = jsonApiLink.match(`${apiPrefix}(.*)`)
    if (Array.isArray(url) && url[1]) {
      return url[1]
    } else {
      throw new Error(`Tide API give a unexpected next url: ${jsonApiLink}`)
    }
  }

  getResourceType(type) {
    return type.replace('node--', '')
  }

  getContentTypeField(key: string, route) {
    let contentType =
      this.contentTypes[route.bundle] || this.contentTypes[route.entity_type]

    // Check for "submodules", i.e. modules that are packaged together
    // for example embedded video and audio are packaged under "media"
    if (contentType && Array.isArray(contentType)) {
      contentType = contentType.find((type) => type?.key === route.bundle)
    }

    return (
      (contentType && contentType.hasOwnProperty(key) && contentType?.[key]) ||
      []
    )
  }

  async getTaxonomy(taxonomyName: string) {
    try {
      return await this.getEntityList('taxonomy_term', taxonomyName)
    } catch (error: any) {
      throw new ApplicationError('Error fetching taxonomy', { cause: error })
    }
  }
}
