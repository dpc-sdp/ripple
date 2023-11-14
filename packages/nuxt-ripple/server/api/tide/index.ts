//@ts-nocheck runtime imports
import { defineEventHandler, H3Event } from 'h3'
import { createHandler } from '@dpc-sdp/ripple-tide-api'

export const createTideApiHandler = async (event: H3Event) => {
  return createHandler(event, 'TideApiHandler', async () => {
    const appConfig = useAppConfig()
    const runtimeConfig = useRuntimeConfig()
    if (appConfig?.ripple && appConfig.project && runtimeConfig.public?.tide) {
      const { packages, theme, featureFlags } = appConfig.ripple
      const { version, sdpVersion } = appConfig.project
      const { baseUrl, site } = runtimeConfig.public.tide
      return {
        project: {
          version,
          sdpVersion
        },
        tide: {
          baseUrl,
          site
        },
        ripple: {
          packages,
          featureFlags,
          theme
        }
      }
    }
  })
}

export default defineEventHandler(async (event: H3Event) => {
  return createTideApiHandler(event)
})
