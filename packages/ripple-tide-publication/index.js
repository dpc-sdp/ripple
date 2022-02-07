export default {
  publication: {
    pageComponent: () => import(/* webpackMode: "eager" */ '@dpc-sdp/ripple-tide-publication/publication.vue'),
    mapping: {
      testPublication: () => 666
    },
    includes: [
    ]
  },
  publication_page: {
    pageComponent: () => import(/* webpackMode: "eager" */ '@dpc-sdp/ripple-tide-publication/publication-page.vue'),
    mapping: {
      testPage: () => 123
    },
    includes: [
    ]
  }
}
