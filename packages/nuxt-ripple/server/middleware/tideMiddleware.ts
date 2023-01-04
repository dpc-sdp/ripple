//@ts-nocheck import typing needs fixing
import { defineEventHandler } from 'h3'
import { TidePageApi, TideSiteApi, logger } from '@dpc-sdp/ripple-tide-api'
import siteMapping from './../../mapping/site'
import { useRuntimeConfig } from '#imports'
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  if (!config.public.tide) {
    logger.error('error loading config')
  }
  if (!event.context.tide) {
    const pageApi = new TidePageApi(config.public.tide, logger)
    const siteApi = new TideSiteApi(config.public.tide, siteMapping, logger)
    event.context.tide = {
      pageApi,
      siteApi
    }
  }
})
