import { getField, getLinkFromField, getLandingPageComponents } from '@dpc-sdp/ripple-tide-api/src/services/utils'
import { getSideBarComponents } from '@dpc-sdp/ripple-tide-landing-page/utils'
import componentMapping from './component-mapping'

export default {
  title: 'title',
  breadcrumbs: (src) => [
    { text: 'Home', url: '/' },
    { text: getField(src, 'title') }
  ],
  heroBanner: {
    links: (src) => src.field_landing_page_key_journeys?.field_paragraph_links?.map(l => getLinkFromField(l)),
    title: 'title',
    introText: 'field_landing_page_intro_text',
    image: 'field_featured_image.field_media_image.url',
    theme: () => 'dark',
    showLinks: () => false,
    visible: () => true
  },
  publishingInfo: {
    author: (src) => src.field_publication_authors.map(x => x.name),
    date: 'field_publication_date',
    copyright: 'field_license_type.description'
  },
  chapters: (src) => getField(src, 'publication_children').filter(x => x.meta).map(item => ({
    id: item.meta.id,
    title: getField(item.meta, 'title', ''),
    summary: getField(item.meta, 'field_landing_page_summary', ''),
    link: {
      url: item.meta.url,
      text: 'Read more'
    }
  })),
  sidebarComponents: getSideBarComponents,
  dynamicComponents: async function (src) { return await getLandingPageComponents(src, 'field_landing_page_component', componentMapping, this) }
}
