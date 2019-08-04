export default {
  // TODO: move all core components load to here from "/nuxt-tide/lib/core/componentLoader.js"
  'rpl-breadcrumbs': () => import(/* webpackChunkName: 'rpl-breadcrumbs' */ '@dpc-sdp/ripple-breadcrumbs'),
  'rpl-markup': () => import(/* webpackChunkName: 'rpl-markup' */ '@dpc-sdp/ripple-markup'),
  'rpl-contact': () => import(/* webpackChunkName: 'rpl-contact' */ '@dpc-sdp/ripple-contact'),
  'rpl-whats-next': () => import(/* webpackChunkName: 'rpl-whats-next' */ '@dpc-sdp/ripple-whats-next'),
  'rpl-share-this': () => import(/* webpackChunkName: 'rpl-share-this' */ '@dpc-sdp/ripple-share-this'),
  'rpl-related-links': () => import(/* webpackChunkName: 'rpl-related-links' */ '@dpc-sdp/ripple-related-links')
}
