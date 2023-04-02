import { getImageFromField } from '@dpc-sdp/ripple-tide-api'

export default {
  meta: {
    url: 'path.url',
    langcode: 'langcode',
    description: (page: any) =>
      page.field_news_intro_text ||
      page.field_landing_page_intro_text ||
      page.field_page_intro_text ||
      page.field_landing_page_summary ||
      '',
    additional: 'metatag',
    // keywords are delivered via metatag
    keywords: () => '',
    image: (page: any) =>
      getImageFromField(page, 'field_featured_image.field_media_image') ||
      getImageFromField(
        page,
        'field_node_primary_site.field_site_og_image.field_media_image'
      ) ||
      null
  }
}
