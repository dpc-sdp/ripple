export default {
  'rpl-markup': () => import(/* webpackChunkName: 'rpl-markup' */ '@dpc-sdp/ripple-markup'),
  'rpl-accordion': () => import(/* webpackChunkName: 'rpl-accordion' */ '@dpc-sdp/ripple-accordion'),
  'rpl-card-promo': () => import(/* webpackChunkName: 'rpl-card' */ '@dpc-sdp/ripple-card').then(m => m.RplCardPromo),
  'rpl-card-keydates': () => import(/* webpackChunkName: 'rpl-card' */ '@dpc-sdp/ripple-card').then(m => m.RplCardKeydates),
  'rpl-card-cta': () => import(/* webpackChunkName: 'rpl-card' */ '@dpc-sdp/ripple-card').then(m => m.RplCardCta),
  'rpl-intro-banner': () => import(/* webpackChunkName: 'rpl-intro-banner' */ '@dpc-sdp/ripple-hero-banner').then(m => m.RplIntroBanner),
  'rpl-campaign-primary': () => import(/* webpackChunkName: 'rpl-campaign-primary' */ '@dpc-sdp/ripple-campaign-primary'),
  'rpl-campaign-secondary': () => import(/* webpackChunkName: 'rpl-campaign-secondary' */ '@dpc-sdp/ripple-campaign-secondary'),
  'rpl-call-to-action': () => import(/* webpackChunkName: 'rpl-call-to-action' */ '@dpc-sdp/ripple-call-to-action'),
  'rpl-timeline': () => import(/* webpackChunkName: 'rpl-timeline' */ '@dpc-sdp/ripple-timeline')
}
