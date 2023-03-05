import type { NitroApp } from 'nitropack'
import siteMapping from '../../mapping/site'

// fix type stub - See https://github.com/nuxt/nuxt/issues/18556
export type NitroAppPlugin = (nitro: NitroApp) => void
function defineNitroPlugin(def: NitroAppPlugin): NitroAppPlugin {
  return def
}

export default defineNitroPlugin((NitroApp) => {
  NitroApp.tide.siteApi.setSiteMapping(siteMapping)
})
11
