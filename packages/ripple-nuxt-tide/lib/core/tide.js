import qs from 'qs'
import jsonapiParse from 'jsonapi-parse'
import tideDefaultConfig from '../config/tide.config'
import menuHierarchy from './menu-hierarchy'
import _ from 'lodash'
import * as helper from './tide-helper'
import * as pageTypes from './page-types'
import * as middleware from './middleware-helper'
import { isTokenExpired } from '../../modules/authenticated-content/lib/authenticate'
import componentLoader from './component-loader'
import markupPluginsLoader from './markup-plugins-loader'
import logger from './logger'

const apiPrefix = '/api/v1/'

export const tide = (axios, site, config) => ({
  /**
   * GET request to tide for resources.
   * @param {String} resource Resource type e.g. <entity type>/<bundle>
   * @param {Object} params Object to convert to QueryString. Passed in URL.
   * @param {String} id Resource UUID
   * @param {String} authToken Authentication token
   */
  get: async function (resource, params = {}, id = '', authToken) {
    // axios config
    const axiosConfig = {
      baseUrl: config.baseUrl,
      auth: config.auth,
      headers: {}
    }

    if (this.isModuleEnabled('authenticatedContent')) {
      // Set 'X-Authorization' header if authToken present
      if (authToken && !isTokenExpired(authToken)) {
        _.merge(axiosConfig.headers, { 'X-Authorization': `Bearer ${authToken}` })
      }
    }

    const siteParam = 'site=' + site
    const url = `${apiPrefix}${resource}${id ? `/${id}` : ''}?${siteParam}${Object.keys(params).length ? `&${qs.stringify(params, { indices: false })}` : ''}`

    if (process.server) {
      logger.log('debug', 'Tide request url %s', url)
    }
    return axios.$get(url, axiosConfig)
  },

  post: async function (resource, data = {}, id = '') {
    const siteParam = resource === 'user/register' ? '?site=' + site : ''
    const url = `${apiPrefix}${resource}${id ? `/${id}` : ''}${siteParam}`
    if (process.server) {
      logger.log('debug', 'Tide post to url: %s', url)
    }

    let headers = {
      'Content-Type': 'application/vnd.api+json;charset=UTF-8'
    }
    _.merge(config, { headers: headers })

    return axios.$post(url, data, config)
  },

  getMenuFields: function () {
    return {
      menuMain: 'field_site_main_menu',
      menuFooter: 'field_site_footer_menu'
    }
  },

  async getSitesData (params = {}) {
    const sites = await this.get('taxonomy_term/sites', params)
    // jsonapiParse merges id & attributes.id (which should retain the menu name for referencing but uses UUID).
    // This has been temporarily resolved by SDPA-442 and a permanent fix is being followed up on the D.o issue queue.
    return sites.data ? this.getAllPaginatedData(sites) : null
  },

  async getSitesDomainMap () {
    const sites = await this.getSitesData()
    let sitesDomainMap = {}
    let domain = ''
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
    return config && config.modules && config.modules[checkForModule] === 1
  },

  getSiteData: async function (tid = null) {
    // TODO: this method need to be reviewed when we do SDPA-585.
    // So it can support without tide_site enabled.
    const siteId = tid || site
    const include = [
      'field_site_logo',
      'field_site_footer_logos',
      'field_site_footer_logos.field_paragraph_media',
      'field_site_footer_logos.field_paragraph_media.field_media_image'
    ]
    const menuFields = this.getMenuFields()
    for (let menu in menuFields) {
      include.push(menuFields[menu])
    }

    const params = { include: include.toString() }

    let sitesData = await this.getSitesData(params)

    if (sitesData) {
      let siteData = null
      sitesData.map((item) => {
        if (item.drupal_internal__tid.toString() === siteId.toString()) {
          siteData = item
        }
      })

      if (siteData === null) {
        throw new Error('Couldn\'t get site data. Please check your site id and Tide site setting.')
      }

      try {
        siteData.menus = await this.getSiteMenus(siteData)
      } catch (error) {
        if (process.server) {
          logger.error('Get menus from Tide failed:', error)
        }
      }

      try {
        siteData.hierarchicalMenus = menuHierarchy.getHierarchicalMenu(siteData.menus)
      } catch (error) {
        if (process.server) {
          logger.error(new Error(`Get hierarchical menu failed: ${error}`))
        }
        siteData.hierarchicalMenus = this.getMenuFields()
        for (let menuField in siteData.hierarchicalMenus) {
          siteData.hierarchicalMenus[menuField] = []
        }
      }

      siteData.siteLogo = this.getSiteLogo(siteData)
      siteData.errorPage = config.customConfig.errorPage

      // TODO: We may only return the siteData element we need, instead of return all data from Drupal.
      return siteData
    }
  },

  getSiteMenus: async function (siteData) {
    const siteMenus = {}
    const menuFields = this.getMenuFields()
    for (let menu in menuFields) {
      if (siteData[menuFields[menu]] !== undefined) {
        try {
          siteMenus[menu] = await this.getMenu(siteData[menuFields[menu]].drupal_internal__id)
        } catch (error) {
          if (process.server) {
            logger.error(new Error(`Get site menus error: ${error}`))
          }
          throw error
        }
      }
    }

    if (Object.keys(siteMenus).length === 0) {
      throw Error('Tide API server error: No site menus found, at least one is required.')
    }

    return siteMenus
  },

  getMenu: async function (menuName) {
    if (!menuName) {
      throw new Error('no menu id provided.')
    }

    const params = {
      filter: {
        menu_link_content: {
          path: 'menu_name',
          value: menuName
        }
      }
    }
    const menu = await this.get('menu_link_content/menu_link_content', params)

    return this.getAllPaginatedData(menu, false)
  },

  // Used for get paginated response data
  getAllPaginatedData: async function (response, parse = true) {
    let data = parse ? jsonapiParse.parse(response).data : response.data

    while (response.links && response.links.next) {
      const resource = helper.jsonApiLinkToResource(response.links.next, apiPrefix)
      if (process.server) {
        logger.log('debug', `Tide get next page: ${resource}`)
      }
      // Use axios directly here because resource url contains all query params.
      response = await axios.$get(apiPrefix + resource, config)

      const nextData = parse ? jsonapiParse.parse(response).data : response.data
      data = data.concat(nextData)
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

  getPathData: async function (path, params, authToken) {
    let routeParams = { path: path }
    if (!_.isEmpty(params)) {
      _.merge(routeParams, params)
    }

    const response = await this.get('route', routeParams, '', authToken)
    return response
  },

  getEntityByPathData: async function (pathData, query, authToken) {
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
    // However, custome entity type is not supported, must be added in here.
    switch (pathData.entity_type) {
      // media entity
      case 'media':
        switch (pathData.bundle) {
          case 'media--embedded_video':
            include = tideIncludeConfig.mediaBase
            include = include.concat(tideIncludeConfig.mediaEmbeddedVideo)
            break

          default:
            include = tideIncludeConfig.mediaBase
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
    if (!_.isEmpty(query)) {
      params = _.merge(query, params)
    }
    const entity = await this.get(endpoint, params, '', authToken)
    return entity
  },

  getPageByPath: async function (path, params, authToken) {
    let pageData = null
    const response = await this.getPathData(path, params, authToken)

    const pathData = jsonapiParse.parse(response).data

    // path got redirected
    if (pathData.redirect_url) {
      return pathData
    }

    const entity = await this.getEntityByPathData(pathData, params, authToken)
    if (!entity) {
      throw new Error('Something wrong. Could not get any entity data from Tide based on API route response.')
    }
    pageData = jsonapiParse.parse(entity).data

    // Append the site section to page data
    pageData.section = pathData.section === site ? null : pathData.section
    return pageData
  },

  getPreviewPage: async function (contentType, uuid, revisionId, section, params, authToken) {
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
    const entity = await this.getEntityByPathData(pathData, params, authToken)
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
    } catch (err) {
      throw new Error('Unable to get a entity list.')
    }
  },

  // Post form to webform
  postForm: async function (formId, formData = {}) {
    const formResource = 'webform_submission'
    // TODO: get IP here will slowdown the submit process, we may need to find another place to do this.
    const ip = await helper.getClientIp(axios)

    const data = {
      data: {
        type: formResource,
        attributes: {
          remote_addr: ip,
          data: JSON.stringify(formData)
        }
      }
    }

    // TODO: Add better error handling/log for form API error.
    // It's blocked by Tide webform response issue SDPA-477.
    // Currently the Tide webform has no right response.
    try {
      const res = await this.post(formResource, data, formId)
      if (res.data) {
        return true
      }
      return false
    } catch (e) {
      return false
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
