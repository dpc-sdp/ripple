export default {
  'rpl-markup': () => import(/* webpackChunkName: 'rpl-markup' */ '@dpc-sdp/ripple-markup'),
  'rpl-accordion': () => import(/* webpackChunkName: 'rpl-accordion' */ '@dpc-sdp/ripple-accordion'),
  'rpl-card-promo': () => import(/* webpackChunkName: 'rpl-card' */ '@dpc-sdp/ripple-card').then(m => m.RplCardPromo),
  'rpl-card-keydates': () => import(/* webpackChunkName: 'rpl-card' */ '@dpc-sdp/ripple-card').then(m => m.RplCardKeydates),
  'rpl-intro-banner': () => import(/* webpackChunkName: 'rpl-intro-banner' */ '@dpc-sdp/ripple-hero-banner').then(m => m.RplIntroBanner)
}
