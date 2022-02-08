import { getField, getLinkFromField, getLandingPageComponents } from '@dpc-sdp/ripple-tide-api/src/services/utils'
import { getSideBarComponents } from '@dpc-sdp/ripple-tide-landing-page/utils'
import componentMapping from './component-mapping'
import { truncateText } from '@dpc-sdp/ripple-global/utils/helpers.js'

export default {
  title: 'title',
  breadcrumbs: (src) => [
    { text: 'Home', url: '/' },
    { text: getField(src, 'field_publication.meta.title'), url: getField(src, 'field_publication.meta.url') },
    { text: getField(src, 'title') }
  ],
  heroBanner: {
    links: (src) => src.field_landing_page_key_journeys?.field_paragraph_links?.map(l => getLinkFromField(l)),
    title: 'title',
    introText: 'field_landing_page_intro_text',
    image: 'field_featured_image.field_media_image.url',
    backgroundGraphic: () => '/img/header-pattern-bottom.png',
    visible: () => true
  },
  publicationPagination: (src) => {
    let pagination = {}
    const prev = src.publication_navigation_prev ? src.publication_navigation_prev.meta : null
    const next = src.publication_navigation_next ? src.publication_navigation_next.meta : null
    if (prev) {
      pagination.previousLink = prev.url
      pagination.previousText = truncateText(prev.title, 40)
      pagination.previousDescription = truncateText(prev.field_landing_page_summary, 60)
    }
    if (next) {
      pagination.nextLink = next.url
      pagination.nextText = truncateText(next.title, 40)
      pagination.nextDescription = truncateText(next.field_landing_page_summary, 60)
    }
    return pagination
  },
  sidebarComponents: getSideBarComponents,
  dynamicComponents: async function (src) { return await getLandingPageComponents(src, 'field_landing_page_component', componentMapping, this) }
}
