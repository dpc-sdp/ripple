import type { NitroApp } from 'nitropack'
import { TidePageApi, TideSiteApi, logger } from '@dpc-sdp/ripple-tide-api'
import siteMapping from '../../mapping/site'
import { useRuntimeConfig } from '#imports'

// fix type stub - See https://github.com/nuxt/nuxt/issues/18556
export type NitroAppPlugin = (nitro: NitroApp) => void
function defineNitroPlugin(def: NitroAppPlugin): NitroAppPlugin {
  return def
}

export default defineNitroPlugin(async (NitroApp) => {
  const config = useRuntimeConfig()
  if (!config.public.tide) {
    logger.error(
      `error loading tide runtimeConfig, check nuxt.config.ts runtimeConfig key is set`
    )
  }
  if (!config.config) {
    logger.error(
      `error loading tide internal runtimeConfig, check nuxt.config.ts runtimeConfig key is set`
    )
  }
  const pageApi = new TidePageApi(config.public.tide, config.config, logger)
  const siteApi = new TideSiteApi(config.public.tide, config.config, logger)
  NitroApp.tide = {
    pageApi,
    siteApi
  }
  NitroApp.tide.siteApi.setSiteMapping(siteMapping)
})
