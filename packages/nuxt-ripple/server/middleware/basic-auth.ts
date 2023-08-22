import { appendHeader, createError, getHeader } from 'h3'
// @ts-ignore TS2307 nuxt auto imports
import { defineEventHandler, useRuntimeConfig } from '#imports'

//

export default defineEventHandler((event: any) => {
  const { basicAuth, tide } = useRuntimeConfig()

  // If `basicAuth` is empty, do not prompt for authentication
  if (!basicAuth || basicAuth === 0 || !tide.config.auth) {
    return
  }

  // Format our credentials to their corresponding header:
  // `user:pass` becomes `Basic dXNlcjpwYXNz`
  const credentials = Buffer.from(
    `${tide.config.auth.username}:${tide.config.auth.password}`
  ).toString('base64')
  const validAuthHeaders = `Basic ${credentials}`
  const authHeader = getHeader(event, 'authorization')

  // If the given authentication header is valid, do not prompt for authentication
  if (authHeader && validAuthHeaders === authHeader) {
    return
  }

  // Set the `www-authenticate` header to prompt for authentication
  // The realm attribute can be used to customize the message shown to the user
  appendHeader(event, 'www-authenticate', 'Basic realm="Identification"')
  throw createError({ statusCode: 401, statusMessage: 'Not authorized' })
})
