//@ts-nocheck runtime imports
import { defineEventHandler, H3Event, sendRedirect } from 'h3'
import { createHandler } from '@dpc-sdp/ripple-tide-api'
import { useNitroApp } from '#imports'
import ClientOAuth2 from 'client-oauth2'
import { nanoid } from 'nanoid'

export const createPageHandler = async (
  event: H3Event,
  authClient: ClientOAuth2
) => {
  return createHandler(event, 'TideOAuthHandler', async () => {
    // Create a random state value to prevent CSRF attacks, this should be unique per request
    const state = nanoid()

    // TODO - Store the state value in a cookie or session

    // Redirect to the Tide OAuth login page, passing the state value
    return sendRedirect(event, authClient.code.getUri({ state }))
  })
}

export default defineEventHandler(async (event: H3Event) => {
  const nitroApp = useNitroApp()
  return createPageHandler(event, nitroApp.tidePreviewOAuthClient)
})
