export default {
  // TODO: We may move below templates import into each module later.
  pageTemplates: {
    'node--grant': () => import('./../../modules/grant/pages/index.vue'),
    'node--profile': () => import('./../../modules/profile/pages/index.vue'),
    'node--landing_page': () => import('./../../modules/landing-page/pages/index.vue'),
    'node--page': () => import('./../../modules/page/pages/index.vue'),
    'node--news': () => import('./../../modules/news/pages/index.vue'),
    'node--event': () => import('./../../modules/event/pages/index.vue'),
    'node--publication': () => import('./../../modules/publication/pages/index.vue'),
    'node--publication_page': () => import('./../../modules/publication/pages/index.vue'),
    'media--embedded_video': () => import('./../../modules/media/components/EmbeddedVideo.vue')
  }
  // TODO: We can also register page types for other purpose by adding new prop here.
}
