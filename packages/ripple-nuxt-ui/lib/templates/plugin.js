import Vue from 'vue'
import RplGlobal from '@dpc-sdp/ripple-global'
import { addCustomIcons } from '@dpc-sdp/ripple-icon'

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

<% if (typeof options.viclogoFooter !== 'undefined') { %>
  rplOptions.viclogoFooter = options.viclogoFooter
<% } %>

<% if (options.card && options.card.trimFieldfonts) { %>
  rplOptions.card = rplOptions.card || {}
  rplOptions.card.trimFieldfonts = options.card.trimFieldfonts
<% } %>

<% if (options.customIcon) { %>
  // Add custom icons to library.
  addCustomIcons(require.context('../assets/ripple-icon/', true, /\.svg$/))
<% } %>

Vue.use(RplGlobal, rplOptions)
