//@ts-nocheck runtime imports
import { defineEventHandler, H3Event, sendRedirect } from 'h3'
import { createHandler } from '@dpc-sdp/ripple-tide-api'
import { useNitroApp } from '#imports'

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
    // TODO: Validate state value before getting token

    const user = await authClient.code.getToken(event.req.originalUrl)

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
