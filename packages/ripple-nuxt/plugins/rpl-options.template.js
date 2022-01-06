import Vue from 'vue'
import RplGlobal from '@dpc-sdp/ripple-global'
import { addCustomIcons } from '@dpc-sdp/ripple-icon/icon-library.js'
import qs from 'qs'

const options = <%= serialize(options) %>

let rplOptions = {
  // Tell Ripple this is a Nuxt app.
  // Ripple then will use <nuxt-link> to render internal link.
  nuxt: true,
  // Set dev mode
  isDev: options.isDev || false
}

<% if (options.hostname) { %>
rplOptions.hostname = options.hostname
<% } %>

<% if (options.quickexit) { %>
rplOptions.quickexit = options.quickexit
<% } %>

<% if (options.quickexiturl) { %>
rplOptions.quickexiturl = options.quickexiturl
<% } %>

<% if (typeof options.viclogo !== 'undefined') { %>
rplOptions.viclogo = options.viclogo
<% } %>

<% if (typeof options.imgQueryString !== 'undefined') { %>
rplOptions.imgQueryString = options.imgQueryString
<% } else { %>
rplOptions.imgQueryString = (bp) => {
  // Provides query string for images using section kraken.io - https://www.section.io/docs/modules/kraken/reference/kraken-advanced-config/
  const params = {
    strategy: 'auto'
  }

  const queryString = (params, options = { indices: false, encode: false }) => {
    if (params) {
      return qs.stringify(params, options)
    }
    return ''
  }

  for (const key in bp) {
    const whitelistParams = ['height', 'width', 'strategy']
    if (bp.hasOwnProperty(key) && whitelistParams.includes(key)) {
      params[key] = bp[key]
    }
  }
  return '?' + queryString(params)
}
<% } %>

<% if (typeof options.viclogoFooter !== 'undefined') { %>
rplOptions.viclogoFooter = options.viclogoFooter
<% } %>

<% if (options.card && options.card.trimFieldfonts) { %>
rplOptions.card = rplOptions.card || {}
rplOptions.card.trimFieldfonts = options.card.trimFieldfonts
<% } %>

<% if (options.externalLinksInNewWindow) { %>
rplOptions.externalLinksInNewWindow = options.externalLinksInNewWindow
<% } %>

<% if (options.customIcon) { %>
// Add custom icons to library. This will be remove when all svgs are converted to JS.
addCustomIcons(require.context('../assets/ripple-icon/', true, /\.svg$/))
// Loop through all JS files to register the icons
const requireCustomFile = require.context(
  './../assets/ripple-icon/', false, /\.js$/
)
requireCustomFile.keys().forEach(fileName => {
  requireCustomFile(fileName);
})
<% } %>

Vue.use(RplGlobal, rplOptions)
