import qs from 'qs'
import jsonapiParse from 'jsonapi-parse'
import tideDefaultConfig from '../config/tide.config'
import menuHierarchy from './menu-hierarchy'
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
import * as helper from './tide-helper'
import * as pageTypes from './page-types'
import * as middleware from './middleware-helper'
import { isTokenExpired } from '../../modules/authenticated-content/lib/authenticate'
import componentLoader from './component-loader'
import markupPluginsLoader from './markup-plugins-loader'
import logger from './logger'
import { RPL_HEADER } from './../config/constants'

const apiPrefix = '/api/v1/'

export const tide = (axios, site, config) => ({
  /**
   * GET request to tide for resources, it returns a promise.
   * @param {String} resource Resource type e.g. <entity type>/<bundle>
   * @param {Object} params Object to convert to QueryString. Passed in URL.
   * @param {String} id Resource UUID
   * @param {Object} headersConfig Tide API request headers config object:{ authToken: '', requestId: '' }
   */
  get: async function (resource, params = {}, id = '', headersConfig = {}, siteId = site) {
    const url = `${apiPrefix}${resource}${id ? `/${id}` : ''}?${siteId ? `site=${siteId}&` : ''}${Object.keys(params).length ? `${qs.stringify(params, { indices: false })}` : ''}`
    return axios.$get(url, this._axiosConfig(headersConfig))
  },

  /**
   * GET request to tide for url, it returns a promise.
   * @param {String} url whole url for request, include params and id
   * @param {Object} headersConfig Tide API request headers config object:{ authToken: '', requestId: '' }
   */
  getByURL: async function (url, headersConfig = {}) {
    return axios.$get(`${apiPrefix}${url}`, this._axiosConfig(headersConfig))
  },

  // Build the axios config for Tide GET request
  _axiosConfig: function (headersConfig) {
    // axios config
    let axiosTimeout = 10000

    // Give more time in Circle CI test
    if (process.env.NODE_ENV === 'test' || process.env.TEST) {
      axiosTimeout = 9000
    }

    const axiosConfig = {
      auth: config.auth,
      timeout: axiosTimeout,
      headers: {
        'Content-Type': 'application/vnd.api+json; charset=UTF-8',
        'Accept': 'application/vnd.api+json',
        [RPL_HEADER.REQ_LOCATION]: 'tide'
      }
    }

    // // Set request location to tide
    // axiosConfig.headers[RPL_HEADER.REQ_LOCATION] = 'tide'

    if (this.isModuleEnabled('authenticatedContent')) {
      // Set 'X-Authorization' header if authToken present
      if (headersConfig.authToken && !isTokenExpired(headersConfig.authToken)) {
        merge(axiosConfig.headers, { 'X-Authorization': `Bearer ${headersConfig.authToken}` })
      }
    }

    if (headersConfig.requestId) {
      axiosConfig.headers['X-Request-Id'] = headersConfig.requestId
    }
    return axiosConfig
  },

  post: async function (resource, data = {}, id = '') {
    // axios config
    const axiosConfig = {
      baseUrl: config.baseUrl,
      auth: config.auth,
      timeout: 9000,
      headers: {
        'Content-Type': 'application/vnd.api+json;charset=UTF-8',
        [RPL_HEADER.REQ_LOCATION]: 'tide',
        'X-Request-Id': helper.generateId()
      }
    }
    const siteParam = '?site=' + site
    const url = `${apiPrefix}${resource}${id ? `/${id}` : ''}${siteParam}`

    return axios.$post(url, data, axiosConfig)
  },

  getMenuFields: function () {
    return {
      menuMain: 'field_site_main_menu',
      menuFooter: 'field_site_footer_menu'
    }
  },

  async getSitesData (params = {}, headersConfig = {}) {
    try {
      const sites = await this.get('taxonomy_term/sites', params, '', headersConfig)
      return this.getAllPaginatedData(sites)
    } catch (error) {
      const errMsg = 'Failed to get sites data from Tide API.  It can be a operation error or configuration error if it\'s the first time to setup this app.'
      if (process.server) {
        logger.error(errMsg, { error, label: 'Tide' })
      }
      return new Error(errMsg)
    }
  },

  async getSitesDomainMap (headersConfig = {}) {
    const sites = await this.getSitesData({}, headersConfig)
    let sitesDomainMap = {}
    let domain = ''
    if (sites instanceof Error) {
      const errMsg = 'Could not get site domain map as no sites data.'
      if (process.server) {
        logger.error(errMsg, { label: 'Tide' })
      }
      return sitesDomainMap
    }

    sites.map((item) => {
      if (item.field_site_domains) {
        domain = item.field_site_domains.valueOf().split('\r\n', 1)
        // Business logic defines the first domain in the array as the primary one.
        sitesDomainMap[item.drupal_internal__tid] = domain[0]
      }
    })
    return sitesDomainMap
  },

  /**
   * Check if a module is enabled.
   * @param {String} checkForModule name of module
   * @returns {Boolean}
   */
  isModuleEnabled: function (checkForModule) {
    const moduleConfig = config.modules[checkForModule]
    return moduleConfig === 1 || (typeof moduleConfig === 'object' && moduleConfig !== null)
  },

  /**
   * Get module config
   * @param {String} moduleName name of module
   * @returns {Object}
   */
  getModuleConfig: function (moduleName) {
    const moduleConfig = config.modules[moduleName]
    if (typeof moduleConfig === 'object' && moduleConfig !== null) {
      return moduleConfig
    }
    return {}
  },

  // TODO: this method need to be reviewed when we do SDPA-585.
  // So it can support without tide_site enabled.
  getSiteData: async function (headersConfig = {}, siteName = null) {
    const include = [
      'field_site_logo',
      'field_site_footer_logos',
      'field_site_footer_logos.field_paragraph_media',
      'field_site_footer_logos.field_paragraph_media.field_media_image',
      'field_header_top_graphic',
      'field_header_bottom_graphic',
      'field_footer_graphic'
    ]

    if (this.isModuleEnabled('alert')) {
      include.push(['site_alerts', 'site_alerts.field_alert_type', 'site_alerts.field_node_site'])
    }

    const menuFields = this.getMenuFields()
    for (let menu in menuFields) {
      include.push(menuFields[menu])
    }
    const params = { include: include.toString() }

    let siteData = null

    if (siteName === null) {
      return new Error('Could not get site data. No site name provided.', { label: 'Tide' })
    } else {
      params.filter = {
        field_site_domains: {
          path: 'field_site_domains',
          operator: 'CONTAINS',
          value: siteName
        }
      }
      try {
        const response = await this.get(`taxonomy_term/sites`, params, '', headersConfig, false)
        if (response.error) {
          throw new Error(response.error)
        }

        siteData = jsonapiParse.parse(response).data[0]
        // Tide API will return empty data array if no site data found.
        if (typeof siteData === 'undefined') {
          throw new Error('Empty data returned from Tide API.')
        }
      } catch (error) {
        console.log('ERROR', error)
        if (process.server) {
          logger.error('Failed to get site data for site name "%s".', siteName, { error, label: 'Tide' })
        }
        return new Error('Could not get site data. Please check your site name and Tide site setting.')
      }
    }

    // Menus
    siteData.menus = await this.getSiteMenus(siteData, headersConfig)

    try {
      siteData.hierarchicalMenus = menuHierarchy.getHierarchicalMenu(siteData.menus)
    } catch (error) {
      if (process.server) {
        logger.error('Get hierarchical menu failed.', { error, label: 'Tide' })
      }
      siteData.hierarchicalMenus = this.getMenuFields()
      for (let menuField in siteData.hierarchicalMenus) {
        siteData.hierarchicalMenus[menuField] = []
      }
    }

    siteData.siteLogo = this.getSiteLogo(siteData)
    siteData.errorPage = config._errorPage

    // TODO: We may only return the siteData element we need, instead of return all data from Drupal.
    return siteData
  },

  getSiteMenus: async function (siteData, headersConfig) {
    const siteMenus = {}
    const menuFields = this.getMenuFields()
    for (let menu in menuFields) {
      if (siteData[menuFields[menu]] !== undefined) {
        const menuResult = await this.getMenu(siteData[menuFields[menu]].drupal_internal__id, headersConfig)
        if (menuResult instanceof Error) {
          if (process.server) {
            logger.error('Failed to get menu "%s"', menu, { menuResult, label: 'Tide' })
          }
        } else {
          siteMenus[menu] = menuResult
        }
      }
    }

    return siteMenus
  },

  getMenu: async function (menuName, headersConfig = {}) {
    if (!menuName) {
      return new Error('no menu id provided.')
    }

    const params = {
      filter: {
        menu_link_content: {
          path: 'menu_name',
          value: menuName
        }
      }
    }

    try {
      const menu = await this.get('menu_link_content/menu_link_content', params, '', headersConfig)
      return this.getAllPaginatedData(menu, false, headersConfig)
    } catch (error) {
      const errMsg = 'Failed to get menu from Tide API.'
      if (process.server) {
        logger.error(errMsg, { error, label: 'Tide' })
      }
      return new Error(errMsg)
    }
  },

  // Used for get paginated response data
  getAllPaginatedData: async function (response, parse = true, headersConfig = {}) {
    let data = parse ? jsonapiParse.parse(response).data : response.data

    while (response.links && response.links.next) {
      const resource = helper.jsonApiLinkToResource(response.links.next, apiPrefix)
      if (process.server) {
        logger.debug('Tide get next page: %s', resource, { label: 'Tide' })
      }
      // Use getByURL directly here because resource url contains all query params.
      try {
        response = await this.getByURL(resource, headersConfig)
        const nextData = parse ? jsonapiParse.parse(response).data : response.data
        data = data.concat(nextData)
      } catch (error) {
        logger.error('Failed to get next page data', { error, label: 'Tide' })
      }
    }
    return data
  },

  getSiteLogo: function (siteData) {
    if (typeof siteData.field_site_logo !== 'undefined') {
      return {
        alt: siteData.field_site_logo.meta.alt.length !== 0 ? siteData.field_site_logo.meta.alt : siteData.name,
        url: '/',
        image: siteData.field_site_logo.url
      }
    }
  },

  getPathData: async function (path, params, headersConfig, siteId) {
    let routeParams = { path: path }
    if (!isEmpty(params)) {
      merge(routeParams, params)
    }

    try {
      const response = await this.get('route', routeParams, '', headersConfig, siteId)
      return response
    } catch (error) {
      // TODO: use return error instead of throw.
      throw new Error(`Failed to get data for path "${path}" with error "${error}"`)
    }
  },

  getEntityByPathData: async function (pathData, query, headersConfig, siteId) {
    const endpoint = `${pathData.entity_type}/${pathData.bundle}/${pathData.uuid}`

    let include
    let defaultConfig = tideDefaultConfig.include
    let customConfig = config.customConfig.include
    let tideIncludeConfig = Object.assign({}, defaultConfig)
    let internalConfig = tideDefaultConfig.internal

    // Merge extend configs from each enabled sub module.
    config.extendConfigs.forEach((extendConfig) => {
      tideIncludeConfig = helper.mergeIncludes(tideIncludeConfig, extendConfig.include)
    })

    // Merge custom config from Nuxt.
    tideIncludeConfig = helper.mergeIncludes(tideIncludeConfig, customConfig)
    // Custom content types are supported.
    // Just need to add it in Nuxt tide.config.js.
    // However, custom entity type is not supported, must be added in here.
    switch (pathData.entity_type) {
      // media entity
      case 'media':
        switch (pathData.bundle) {
          case 'embedded_video':
            include = tideIncludeConfig.mediaBase
            include = include.concat(tideIncludeConfig.mediaEmbeddedVideo)
            break

          default:
            include = tideIncludeConfig.mediaBase
            break
        }
        break
      case 'taxonomy_term':
        switch (pathData.bundle) {
          case 'tags':
          case 'topic':
            include = []
            break
        }
        break
      // node entity
      default:
        // Convert Tide bundle name to camelcase.
        // https://stackoverflow.com/a/6661012/1212791
        const bundleName = pathData.bundle.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase() })

        if (internalConfig.sdpPageTypes.indexOf(bundleName) >= 0) {
          include = internalConfig.sdpPageBase
          include = include.concat(tideIncludeConfig[bundleName])
          if (bundleName === 'grant') {
            include = include.filter(item => item !== 'field_related_links')
          }
        } else {
          include = tideIncludeConfig[bundleName]
        }
    }
    // remove undefined includes
    let params = { include: include.filter(i => i).join(',') }
    // If query URL is not empty include in URL request
    if (!isEmpty(query)) {
      params = merge(query, params)
    }
    try {
      const entity = await this.get(endpoint, params, '', headersConfig, siteId)
      return entity
    } catch (error) {
      return new Error(`Failed to get entity "${pathData.entity_type}/${pathData.bundle}/${pathData.uuid}" data, with error "${error}"`)
    }
  },

  getPageByPath: async function (path, params, headersConfig, siteId) {
    let pageData = null
    const response = await this.getPathData(path, params, headersConfig, siteId)

    const pathData = jsonapiParse.parse(response).data

    // path got redirected
    if (pathData.redirect_url) {
      return pathData
    }

    const entity = await this.getEntityByPathData(pathData, params, headersConfig, siteId)
    if (entity instanceof Error) {
      throw entity
    }
    pageData = jsonapiParse.parse(entity).data

    // Append the site section to page data
    pageData.section = pathData.section === site ? null : pathData.section
    return pageData
  },

  getPreviewPage: async function (contentType, uuid, revisionId, section, params, headersConfig) {
    if (revisionId === 'latest') {
      params.resourceVersion = 'rel:working-copy'
    } else {
      params.resourceVersion = `id:${revisionId}`
    }

    const pathData = {
      entity_type: 'node',
      bundle: contentType,
      uuid: uuid
    }
    const entity = await this.getEntityByPathData(pathData, params, headersConfig)
    if (entity instanceof Error) {
      throw entity
    }
    const pageData = jsonapiParse.parse(entity).data

    // Append the site section to page data
    pageData.section = (section && section !== site) ? section : null
    return pageData
  },

  getContentList: async function (bundle, filtering, includes, pagination, sorting, config) {
    return this.getEntityList('node', bundle, filtering, includes, pagination, sorting, config)
  },

  getEntityList: async function (entityType, bundle, filtering, includes, pagination, sorting, { allPages = true } = {}) {
    let params = {}
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
      const response = await this.get(`${entityType}/${bundle}`, params)
      if (allPages) {
        return this.getAllPaginatedData(response)
      } else {
        return jsonapiParse.parse(response).data
      }
    } catch (error) {
      const errMsg = `Failed to get a entity list from Tide API for "${entityType}:${bundle}".`
      logger.error(errMsg, { error, label: 'Tide' })
      return new Error(errMsg)
    }
  },

  callMiddleware: async function (context) {
    return middleware.callMiddleware(config.middleware, context)
  },

  getPageTypeTemplate: function (type) {
    return pageTypes.getTemplate(type, config.pageTypes)
  },

  getMarkupPlugins: function () {
    return markupPluginsLoader(config.markupPlugins)
  },

  getDynamicComponents: function (components = [], sidebar) {
    return componentLoader.dComponentsLoader(components, sidebar, config.dynamicComponents)
  },

  getDynamicComponent: function (component = [], sidebar) {
    return componentLoader.dComponentLoader(component, sidebar, config.dynamicComponents)
  }
})
