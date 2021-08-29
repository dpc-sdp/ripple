import { Module } from '@nuxt/types'
import createRippleTideApiServer, { RippleTideApiConfig } from './create-server'
import { getModulesFromConfig,  getSiteConfig, getModulePaths } from './load-config'
const path = require('path')
const TideApiModule: Module = async function (moduleOptions: RippleTideApiConfig){

  const modules = await getModulesFromConfig(moduleOptions)
  const siteMapping = await getSiteConfig(moduleOptions)
  const conf: RippleTideApiConfig = {
    ...moduleOptions,
    modules,
    siteMapping
  }


  this.extendRoutes((routes, resolve) => {
    routes.push(
      {
        // Extends routes to add tide page wildcard route, routes added under /pages will still take precedence
        name: 'tide-page',
        path: '*',
        component: resolve(__dirname, './../components/tide.vue')
      }
    )
  })

  this.addPlugin({
    src: path.resolve(__dirname, './../plugins/tide-api.js'),
    fileName: 'tide-api.js',
    options: {
      ...moduleOptions,
      modules
    }
  })

  this.requireModule(['@nuxtjs/axios', {
    debug: false,
    // Using proxy for Tide request https://axios.nuxtjs.org/options#proxy
    // proxy: true
  }])
  this.addServerMiddleware(createRippleTideApiServer(conf))
}

export default TideApiModule


export const meta = require('./../package.json')