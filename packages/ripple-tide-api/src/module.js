import createRippleTideApiServer from './create-server'
import { getModulesFromConfig, getSiteConfig } from './load-config'
const path = require('path')

export default async function (moduleOptions) {
  const modules = await getModulesFromConfig(moduleOptions)
  const siteMapping = await getSiteConfig(moduleOptions)
  const conf = {
    ...moduleOptions,
    modules,
    siteMapping
  }

  const SITEID = this.options.publicRuntimeConfig

  this.addPlugin({
    src: path.resolve(__dirname, './../plugins/tide-api.template.js'),
    fileName: 'tide-api.js',
    options: {
      ...moduleOptions,
      modules
    }
  })
  // Proxy images and media only
  this.options.proxy = {
    ...this.options.proxy,
    '/sitemap.xml':
      process.env.CONTENT_API_SERVER + 'sitemap.xml?site=' + SITEID,
    '/sitemaps/**/sitemap.xml': {
      target: process.env.CONTENT_API_SERVER,
      pathRewrite: (path) => {
        return process.env.CONTENT_API_SERVER + path + '?site=' + SITEID
      }
    },
    '/sites/default/files/**/*': process.env.CONTENT_API_SERVER,
    '/oauth/token': {
      target: process.env.CONTENT_API_SERVER,
      onProxyReq (proxyReq, req, res) {
        // As oauth/token is a proxied request, this authorization header
        // for the nuxt site is not valid for the proxied target.
        // Not removing it will present an unauthorizable user prompt.
        proxyReq.removeHeader('authorization')
      }
    }
  }

  this.requireModule(['@nuxtjs/axios', {
    debug: false,
    // Using proxy for Tide request https://axios.nuxtjs.org/options#proxy
    proxy: {
      '/sitemap.xml':
        process.env.CONTENT_API_SERVER + 'sitemap.xml?site=' + SITEID,
      '/sitemaps/**/sitemap.xml': {
        target: process.env.CONTENT_API_SERVER,
        pathRewrite: (path) => {
          return process.env.CONTENT_API_SERVER + path + '?site=' + SITEID
        }
      },
      '/sites/default/files/**/*': process.env.CONTENT_API_SERVER,
      '/oauth/token': {
        target: process.env.CONTENT_API_SERVER,
        onProxyReq (proxyReq, req, res) {
          // As oauth/token is a proxied request, this authorization header
          // for the nuxt site is not valid for the proxied target.
          // Not removing it will present an unauthorizable user prompt.
          proxyReq.removeHeader('authorization')
        }
      }
    }
  }])
  this.addServerMiddleware(createRippleTideApiServer(conf))
}

export const meta = require('./../package.json')
