import cuid from 'cuid'
export const isSharePath = path => {
  return path.indexOf('/share_link/') === 0
}

export const getBaseUrl = req => {
  if (req) {
    return req.protocol + '://' + req.headers.host
  } else if (typeof window !== 'undefined') {
    return window.location.origin
  }
}

export class TideApi {
  constructor (config) {
    this.baseUrl = config.baseUrl
    this.client = config.client
    this.site = config.site
    this.hostname = config.hostname
    this.logLevel = config.logLevel || 'verbose'
    this.sharelinkHeader = config.shareLinkHeader || 'X-Share-Link-Token'
    this.previewLinkHeader =
      config.previewLinkHeader || 'X-OAuth2-Authorization'
    this.modules = config.modules
  }

  async get (route, options = { headers: {} }) {
    try {
      if (!route) {
        throw new Error('No route defined')
      }
      this.client.setHeader('x-request-id', cuid())
      
      const requestUrl = new URL(this.baseUrl + route)
      if (requestUrl.searchParams) {
        const searchParams = requestUrl.searchParams
        const path = searchParams.get('path')
        if (path) {
          if (
            isSharePath(path) &&
            options.headers.hasOwnProperty(this.sharelinkHeader)
          ) {
            this.client.setHeader(
              this.sharelinkHeader,
              options.headers[this.sharelinkHeader]
            )
          }
        }
      }
      return this.client
        .get(this.baseUrl + route, options)
        .then(res => {
          const data = res.data
          const headers = {}
          if (res.headers) {
            const tagsHeader = res.headers['section-cache-tags']
            if (tagsHeader) {
              headers['section-cache-tags'] = tagsHeader
            }
          }
          if (this.logLevel === 'verbose') {
            console.log(this.baseUrl + res.config.url)
          }
          return Promise.resolve({
            data,
            headers
          })
        })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  getModuleComponent (key) {
    if (this.modules.hasOwnProperty(key) && this.modules[key].hasOwnProperty('pageComponent')) {
      return this.modules[key].pageComponent
    }
  }

  getBodyComponent (key) {
    // TODO: This just gets the first matching component of any module, perhaps we should prefer the current page type?
    let match
    Object.keys(this.modules).find(k => {
      if (this.modules[k].hasOwnProperty('components')) {
        if (this.modules[k].components.hasOwnProperty(key)) {
          match = this.modules[k].components[key]
        }
      }
    })
    return match
  }

  async postWebform (webformId, postData, siteId = 4) {
    const formResource = 'webform_submission'
    const submitBody = {
      data: {
        type: formResource,
        attributes: {
          remote_addr: '0.0.0.0', // A IP placeholder for Tide validation, incase the IP is required.
          data: `${JSON.stringify(postData)}`
        }
      }
    }
    try {
      const response = await this.client.post(
        `${this.hostname}/api/v1/${formResource}/${webformId}?site=${siteId}`,
        submitBody,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json;charset=UTF-8',
          },
        },
      )
      return response
    } catch (error) {
      return {
        error: true,
        code: error.response.status,
        message: error.response,
      }
    }
  }
}

export default ({ req, env, app, redirect, error: nuxtError, $config: { API_URL } }, inject) => {
  const config = <%= serialize(options) %>

  app.$axios.setBaseURL(getBaseUrl(req) + API_URL)
  app.$axios.onError(error => {
    // Redirect to login page again if both token and refresh token have expired.
    if (
      error.response &&
      error.response.status &&
      error.request.method !== 'POST'
    ) {
      // handled errors go here
      if (error.response.status === 401) {
        app.$auth.reset()
        redirect(301, `/oauth/login?destination=${req.url}&expired=true`)
        return Promise.resolve(false)
      }
      if (error.response.status === 404) {
        return Promise.resolve(error.response)
      }

      nuxtError({
        statusCode: error.response.status,
        message: error.message
      })
    }
    return Promise.resolve(false)
  })
  const hostname = API_URL || getBaseUrl(req)
  const baseUrl = `${hostname}/tide-api/v2`

  const tideApi = new TideApi({
    hostname,
    baseUrl,
    modules: config.modules,
    site: config && config.tide && config.tide.site,
    client: app.$axios
  })

  inject('tideApi', tideApi)
}
