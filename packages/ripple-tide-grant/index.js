import mime from 'mime-types'
import { getField, getLinkFromField, getImageFromField, humanizeFilesize } from '@dpc-sdp/ripple-tide-api/src/services/utils'
import { extractAudiences } from './utils'

export default {
  pageComponent: () => import(/* webpackMode: "eager" */ '@dpc-sdp/ripple-tide-grant/index.vue'),
  mapping: {
    title: 'title',
    summary: 'field_landing_page_summary',
    acknowledgement: () => true,
    heroBanner: {
      links: (src) => src.field_landing_page_key_journeys?.field_paragraph_links?.map(l => getLinkFromField(l)),
      title: 'title',
      introText: 'field_news_intro_text',
      image: (src) => getImageFromField(src, 'field_landing_page_hero_image')
    },
    overview: {
      title: 'field_overview_title',
      audience: (src) => extractAudiences(getField(src, 'field_audience')),
      funding: 'field_node_funding_level',
      startdate: 'field_node_dates.value',
      enddate: 'field_node_dates.end_value',
      description: 'field_description.processed',
      link: (src) => getLinkFromField(src, 'field_call_to_action')
    },
    timeline: {
      title: 'field_node_timeline.field_paragraph_title',
      list: (src) => getField(src, 'field_node_timeline.field_timeline').map(timeline => ({
        title: getField(timeline, 'field_paragraph_title'),
        subtitle: getField(timeline, 'field_paragraph_cta_text'),
        // url: getLinkFromField(timeline, 'field_paragraph_link'),
        url: timeline.field_paragraph_link.origin_url || timeline.field_paragraph_link.uri,
        image: timeline.field_paragraph_media && timeline.field_paragraph_media.field_media_image ? timeline.field_paragraph_media.field_media_image.url || timeline.field_paragraph_media.field_media_image.uri : null,
        dateStart: getField(timeline, 'field_paragraph_date_range.value', null),
        dateEnd: getField(timeline, 'field_paragraph_date_range.end_value', null),
        description: getField(timeline, 'field_paragraph_summary')
      }))
    },
    guidelines: {
      title: 'field_node_guidelines.field_paragraph_title',
      accordions: (src) => getField(src, 'field_node_guidelines.field_paragraph_accordion', []).map(acc => ({
        title: getField(acc, 'field_paragraph_accordion_name'),
        content: getField(acc, 'field_paragraph_accordion_body.processed', '')
      }))
    },
    supportingDocuments: (src) => getField(src, 'field_node_documents').map(doc => ({
      name: doc.name,
      url: doc.field_media_file.url || doc.field_media_file.uri,
      extension: mime.extension(doc.field_media_file.filemime),
      filesize: humanizeFilesize(doc.field_media_file.filesize),
      id: doc.id
    })),
    showLastUpdated: () => true
  },
  includes: [
    'field_audience',
    'field_node_guidelines.field_paragraph_accordion',
    'field_node_timeline.field_timeline.field_paragraph_media.field_media_image',
    'field_node_documents.field_media_file',
    'field_landing_page_contact.field_paragraph_phones',
    'field_landing_page_contact.field_paragraph_social_media'
  ]
}
