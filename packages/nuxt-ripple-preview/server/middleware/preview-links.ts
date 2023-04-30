import { defineEventHandler, getCookie, sendRedirect } from 'h3'
import { isPreviewPath } from '../../utils'
import { AuthRoutes, AuthCookieNames } from '../../utils/constants'

/**
 * This middleware checks it the user is visiting a preview page:
 *   If so, it checks if the user has a non-expired access token (does not check if the token is valid)
 *     If there is no access token, they are taken to the login flow
 *     If there is an expired access token, they are taken to the login flow
 *     If there is a non-expired access token, they will proceed to the preview page to view the preview
 *
 * All other non-preview requests will be ignored
 */
export default defineEventHandler((event) => {
  if (isPreviewPath(event.path)) {
    const accessToken = getCookie(event, AuthCookieNames.ACCESS_TOKEN)
    const accessTokenExpiry = parseFloat(
      getCookie(event, AuthCookieNames.ACCESS_TOKEN_EXPIRY)
    )
    const isTokenExpired = accessTokenExpiry
      ? accessTokenExpiry < Date.now()
      : true

    if (!accessToken || isTokenExpired) {
      return sendRedirect(
        event,
        `${AuthRoutes.LOGGING_IN}?destination=${event.path}`,
        302
      )
    }
  }
})
