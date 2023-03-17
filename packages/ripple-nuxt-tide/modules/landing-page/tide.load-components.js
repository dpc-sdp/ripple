export default {
  'tide-open-form': () => import(/* webackChunkName: 'tide-open-form' */ './components/TideOpenForm'),
  'automated-card-listing': () => import(/* webpackChunkName: 'automated-card-listing' */ '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/components/CardCollection'),
  'content-collection': () => import(/* webpackChunkName: 'automated-card-listing' */ '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/components/ContentCollection'),
  'data-list': () => import(/* webpackChunkName: 'data-list' */ '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/components/DataList')
}
