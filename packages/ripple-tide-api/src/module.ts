import { Module } from '@nuxt/types'
import createRippleTideApiServer, { RippleTideApiConfig } from './create-server'
import { getModulesFromConfig,  getSiteConfig } from './load-config'


const TideApiModule: Module = async function (moduleOptions: RippleTideApiConfig){
  const modules = await getModulesFromConfig(moduleOptions)
  const siteMapping = await getSiteConfig(moduleOptions)
  const conf: RippleTideApiConfig = {
    ...moduleOptions,
    modules,
    siteMapping
  }
  this.addServerMiddleware(createRippleTideApiServer(conf))
}

export default TideApiModule


export const meta = require('./../package.json')