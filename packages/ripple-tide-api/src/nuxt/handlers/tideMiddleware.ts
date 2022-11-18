//@ts-nocheck import typing needs fixing
import { defineEventHandler } from 'h3'
import {
  TidePageApi,
  TideSiteApi,
  TidePublicationIndexApi,
  defineRplTideModule,
  logger
} from '@dpc-sdp/ripple-tide-api'
import { useRuntimeConfig } from '#imports'
export default defineEventHandler(async (event) => {
  const {
    public: { tide: tideConfig }
  } = useRuntimeConfig()
  const rplTideModules = await defineRplTideModule(tideConfig)
  const pageApi = new TidePageApi(
    {
      ...tideConfig,
      mapping: rplTideModules
    },
    logger
  )
  const siteApi = new TideSiteApi(
    {
      ...tideConfig,
      mapping: rplTideModules
    },
    logger
  )
  const publicationIndexApi = new TidePublicationIndexApi(
    {
      ...tideConfig,
      mapping: rplTideModules
    },
    logger
  )
  event.context.tide = {
    pageApi,
    siteApi,
    publicationIndexApi
  }
})
