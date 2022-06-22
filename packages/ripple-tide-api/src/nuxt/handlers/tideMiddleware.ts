//@ts-nocheck import typing needs fixing
import { defineEventHandler } from 'h3'
import {
  TidePageApi,
  TideSiteApi,
  defineRplTideModule
} from '@dpc-sdp/ripple-tide-api'
import { useRuntimeConfig } from '#imports'
export default defineEventHandler(async (event) => {
  const {
    public: { tide: tideConfig }
  } = useRuntimeConfig()
  const rplTideModules = await defineRplTideModule(tideConfig)
  const pageApi = new TidePageApi({
    ...tideConfig,
    mapping: rplTideModules
  })
  const siteApi = new TideSiteApi({
    ...tideConfig,
    mapping: rplTideModules
  })
  event.context.tide = {
    pageApi,
    siteApi
  }
})
