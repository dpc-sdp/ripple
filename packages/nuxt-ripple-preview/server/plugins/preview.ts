import type { NitroApp } from 'nitropack'
import { logger } from '@dpc-sdp/ripple-tide-api'
import ClientOAuth2 from 'client-oauth2'
import { useRuntimeConfig } from '#imports'
import { AuthRoutes } from '../../utilities/constants'

// fix type stub - See https://github.com/nuxt/nuxt/issues/18556
export type NitroAppPlugin = (nitro: NitroApp) => void
function defineNitroPlugin(def: NitroAppPlugin): NitroAppPlugin {
  return def
}

/**
 * This server plugin is used to add the OAuth2 client to the NitroApp instance.
 *
 * The OAuth2 client will be used by other endpoints
 */
export default defineNitroPlugin(async (NitroApp) => {
  const config = useRuntimeConfig()

  if (!config.tide.preview) {
    logger.error(
      `error loading tide runtimeConfig, check nuxt.config.ts runtimeConfig key is set`
    )
  }

  const tideBaseUrl = config.public.tide.baseUrl
  const siteUrl = config.public.siteUrl

  const authClient = new ClientOAuth2({
    clientId: config.tide.preview.clientId,
    clientSecret: config.tide.preview.clientSecret,
    accessTokenUri: `${tideBaseUrl}/oauth/token`,
    authorizationUri: `${tideBaseUrl}/oauth/authorize`,
    scopes: ['editor'],
    redirectUri: `${siteUrl}${AuthRoutes.CALLBACK}`
  })

  NitroApp.tidePreviewOAuthClient = authClient
})
