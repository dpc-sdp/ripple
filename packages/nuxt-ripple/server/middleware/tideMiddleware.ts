//@ts-nocheck import typing needs fixing
import { defineEventHandler } from 'h3'
import {
  TidePageApi,
  TideSiteApi,
  logger,
  defineRplTideModule
} from '@dpc-sdp/ripple-tide-api'
import { useRuntimeConfig } from '#imports'
export default defineEventHandler(async (event) => {
  console.log('tide Middleware')
  const config = useRuntimeConfig()
  if (!config.public.tide) {
    logger.error('error loading config')
  }
  if (!event.context.tide) {
    const rplTideModules = await defineRplTideModule(config.public.tide)
    const pageApi = new TidePageApi(
      {
        ...config.public.tide,
        mapping: rplTideModules
      },
      logger
    )
    const siteApi = new TideSiteApi(
      {
        ...config.public.tide,
        mapping: rplTideModules
      },
      logger
    )
    event.context.tide = {
      pageApi,
      siteApi
    }
  }
})
