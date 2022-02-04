export default {
  'rpl-markup': () => import(/* webpackChunkName: 'rpl-markup' */ '@dpc-sdp/ripple-markup'),
  'rpl-accordion': () => import(/* webpackChunkName: 'rpl-accordion' */ '@dpc-sdp/ripple-accordion'),
  'rpl-card-promo': () => import(/* webpackChunkName: 'rpl-card' */ '@dpc-sdp/ripple-card').then(m => m.RplCardPromo),
  'rpl-card-keydates': () => import(/* webpackChunkName: 'rpl-card' */ '@dpc-sdp/ripple-card').then(m => m.RplCardKeydates),
  'rpl-card-cta': () => import(/* webpackChunkName: 'rpl-card' */ '@dpc-sdp/ripple-card').then(m => m.RplCardCta),
  'rpl-contact': () => import(/* webpackChunkName: 'rpl-contact' */ '@dpc-sdp/ripple-contact'),
  'rpl-intro-banner': () => import(/* webpackChunkName: 'rpl-intro-banner' */ '@dpc-sdp/ripple-hero-banner').then(m => m.RplIntroBanner),
  'rpl-campaign-primary': () => import(/* webpackChunkName: 'rpl-campaign-primary' */ '@dpc-sdp/ripple-campaign-primary'),
  'rpl-campaign-secondary': () => import(/* webpackChunkName: 'rpl-campaign-secondary' */ '@dpc-sdp/ripple-campaign-secondary'),
  'rpl-call-to-action': () => import(/* webpackChunkName: 'rpl-call-to-action' */ '@dpc-sdp/ripple-call-to-action'),
  'rpl-timeline': () => import(/* webpackChunkName: 'rpl-timeline' */ '@dpc-sdp/ripple-timeline'),
  'rpl-related-links': () => import(/* webpackChunkName: 'rpl-related-links' */ '@dpc-sdp/ripple-related-links'),
  'rpl-whats-next': () => import(/* webpackChunkName: 'rpl-whats-next' */ '@dpc-sdp/ripple-whats-next'),
  'rpl-share-this': () => import(/* webpackChunkName: 'rpl-share-this' */ '@dpc-sdp/ripple-share-this'),
  'rpl-text-link': () => import(/* webpackChunkName: 'rpl-link' */ '@dpc-sdp/ripple-link').then(m => m.RplTextLink),
  'rpl-embedded-video': () => import(/* webpackChunkName: 'rpl-embedded-video */ '@dpc-sdp/ripple-embedded-video')
}
