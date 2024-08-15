import { load } from 'cheerio'
import type { NitroApp } from 'nitropack'

// fix type stub - See https://github.com/nuxt/nuxt/issues/18556
export type NitroAppPlugin = (nitro: NitroApp) => void
function defineNitroPlugin(def: NitroAppPlugin): NitroAppPlugin {
  return def
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    /**
     * @WORKAROUND: remove auto generated <link rel="prefetch" /> tags from the head
     * currently it automatically adds prefetch tags for all assets imported in the page
     */
    // https://github.com/nuxt/nuxt/issues/18376#issuecomment-1431318970
    // https://github.com/nuxt/nuxt/issues/18376

    html.head = html.head.map((head) => {
      const $ = load(head)
      $('link[rel=prefetch]').each(function () {
        $(this).remove()
      })
      $('link[rel=modulepreload]').each(function () {
        $(this).remove()
      })
      $('link[rel=preload]').each(function () {
        $(this).remove()
      })

      return $.root().find('head').contents()
    })
  })
})
