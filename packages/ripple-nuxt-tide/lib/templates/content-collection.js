import ContentCollection from '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/lib/content-collection'

export default async ({ app, req, store , route }, inject) => {
  // We need to serialize functions, so use `serialize` instead of `JSON.stringify`.
  // https://github.com/nuxt-community/modules/issues/170
  // https://www.npmjs.com/package/serialize-javascript
  const options = <%= serialize(options) %>

  <% if (options.useCustomPath) { %>
  const customConstructor = await import(/* webpackMode: "lazy" */ '../tide/tide.content-collection.js').then(m => m.default)
  inject('tideContentCollection', customConstructor)
  <% } %>
  <% if (!options.useCustomPath) { %>
  inject('tideContentCollection', ContentCollection)
  <% } %>
}
