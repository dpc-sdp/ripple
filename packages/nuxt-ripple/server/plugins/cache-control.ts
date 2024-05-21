import type { NitroApp } from 'nitropack'

// fix type stub - See https://github.com/nuxt/nuxt/issues/18556
export type NitroAppPlugin = (nitro: NitroApp) => void
function defineNitroPlugin(def: NitroAppPlugin): NitroAppPlugin {
  return def
}

export default defineNitroPlugin(async (NitroApp) => {
  NitroApp.hooks.hook('error', (error, { event }) => {
    if (event && (error as any).statusCode === 404) {
      // 404 responses are cached for 30s by reverse proxy to avoid load on origin, browsers should not cache and must revalidate
      setHeader(
        event,
        'cache-control',
        'public, proxy-revalidate, s-maxage=5, max-age=0'
      )
    }
    if (event && (error as any).statusCode === 500) {
      // 500 errors should never be cached
      setHeader(event, 'cache-control', 'no-cache, private, max-age=0')
    }
  })
})
