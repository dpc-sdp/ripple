//@ts-nocheck runtime imports
import { defineEventHandler, H3Event, sendRedirect } from 'h3'
import { createHandler } from '@dpc-sdp/ripple-tide-api'
import { ApplicationError } from '@dpc-sdp/ripple-tide-api/errors'
import { useNitroApp } from '#imports'
import ClientOAuth2 from 'client-oauth2'
import { nanoid } from 'nanoid'
import cookie from 'cookie-signature'
import { AuthCookieNames, AuthRoutes } from '../../../utils/constants'

export const createOauthHandler = async (
  event: H3Event,
  authClient: ClientOAuth2
) => {
  return createHandler(event, 'TideOAuthHandler', async () => {
    const config = useRuntimeConfig()
    const cookieSignSecret = config.tide.preview.cookieSignSecret

    if (!cookieSignSecret) {
      throw new ApplicationError('Missing cookieSignSecret in runtimeConfig')
    }

    // Create a random state value to prevent CSRF attacks, this should be unique per request
    // Signing the state ensures that it was created by us and not modified by the user
    // https://stateful.com/blog/oauth-state-parameters-nodejs
    const state = nanoid()
    const signedState = cookie.sign(state, cookieSignSecret)

    // Set the state value in a cookie so we can validate it later
    setCookie(event, AuthCookieNames.STATE, signedState, {
      httpOnly: true,
      secure: true
    })

    // Redirect to the Tide OAuth login page, passing the state value
    return sendRedirect(
      event,
      authClient.code.getUri({
        state
      })
    )
  })
}

export default defineEventHandler(async (event: H3Event) => {
  const nitroApp = useNitroApp()
  return createOauthHandler(event, nitroApp.tidePreviewOAuthClient)
})
