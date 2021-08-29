import { mapping } from '@dpc-sdp/ripple-tide-landing-page'

export default {
  component: () => import(/* webpackMode: "eager" */ '~/tide-api/grant/index.vue'),
  mapping: {
    ...mapping,
    test: () => '123'
  },
  includes: [
  ]
}
