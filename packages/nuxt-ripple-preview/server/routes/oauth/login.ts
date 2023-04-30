//@ts-nocheck runtime imports
import { defineEventHandler, H3Event, sendRedirect, getCookie } from 'h3'
import { createHandler } from '@dpc-sdp/ripple-tide-api'
import { UnauthorisedError } from '@dpc-sdp/ripple-tide-api/errors'
import { useNitroApp } from '#imports'
import cookie from 'cookie-signature'

/**
 * The OAuth flow will redirect to this handler after the user has logged in.
 *
 * Is contains the code and state values in the query string, which are used to get an access token.
 *
 * We must validate here that state value is the same as the one sent during the initial login request to mitigate CSRF attacks.
 *
 * The access token and expiry is then stored in a cookie and the user is redirected to the success page.
 */
export const createPageHandler = async (event: H3Event, authClient) => {
  return createHandler(event, 'TideOAuthLoginHandler', async () => {
    const config = useRuntimeConfig()
    const cookieSignSecret = config.tide.preview.cookieSignSecret

    if (!cookieSignSecret) {
      throw new ApplicationError('Missing cookieSignSecret in runtimeConfig')
    }

    // Get the state value from the query string and the one stored in the cookie
    const query = await getQuery(event)
    const queryState = query.state
    const storedState = getCookie(event, 'nuxt_auth_state')

    // The stored state cookie value is signed, so we need to unsign it to get the original value
    const unsignedState = cookie.unsign(storedState, cookieSignSecret)

    // Delete the state cookie, it shouldn't be used for multiple requests
    deleteCookie(event, 'nuxt_auth_state')

    if (unsignedState === false) {
      throw new UnauthorisedError(
        'OAuth state cookie signature is invalid, likely a CSRF attack'
      )
    }

    // Check that the state value in the query string matches the one stored in the cookie, if they don't match then it's likely a CSRF attack
    if (!unsignedState || queryState !== unsignedState) {
      throw new UnauthorisedError(
        "Stored OAuth state value doesn't match value found in query string"
      )
    }

    // Get the access token using the authorisation code value from the query string
    const user = await authClient.code.getToken(event.node.req.originalUrl)

    // Set the access token and expiry in cookies
    setCookie(event, 'nuxt_access_token', user.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    })

    const expiry = new Date(user.expires)
    setCookie(event, 'nuxt_access_token_expiry', expiry.getTime(), {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    })

    return sendRedirect(event, '/oauth/success')
  })
}

export default defineEventHandler(async (event: H3Event) => {
  const nitroApp = useNitroApp()
  return createPageHandler(event, nitroApp.tidePreviewOAuthClient)
})
