import mime from 'mime-types'
import {
  getBodyFromField,
  getField,
  getImageFromField,
  humanizeFilesize
} from '@dpc-sdp/ripple-tide-api'
import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'
import { formatPriceRange } from '@dpc-sdp/nuxt-ripple/mapping/utils'
import formatGrantAudiences from './utils/formatGrantAudiences'
import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'

const tideGrantModule: IRplTideModuleMapping = {
  mapping: {
    ...tidePageBaseMapping({
      withSidebarSiteSectionNav: false,
      withSidebarContacts: true,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: true
    }),
    summary: 'field_landing_page_summary',
    header: {
      title: 'title',
      summary: 'field_landing_page_intro_text'
    },
    overview: {
      title: 'field_overview_title',
      funding: (src: string) =>
        formatPriceRange(
          getField(src, 'field_node_funding_level.from'),
          getField(src, 'field_node_funding_level.to')
        ),
      audience: (src: string) =>
        formatGrantAudiences(getField(src, 'field_audience')),
      date: {
        from: 'field_node_dates.value',
        to: 'field_node_dates.end_value'
      },
      ongoing: 'field_node_on_going',
      description: (src: string) => getBodyFromField(src, 'field_description'),
      link: 'field_call_to_action'
    },
    timeline: {
      title: 'field_node_timeline.field_paragraph_title',
      list: (src: any) =>
        src.field_node_timeline?.field_timeline
          ? getField(src, 'field_node_timeline.field_timeline').map(
              (timeline: any) => ({
                title: getField(timeline, 'field_paragraph_title'),
                subtitle: getField(timeline, 'field_paragraph_cta_text'),
                url:
                  timeline.field_paragraph_link?.origin_url ||
                  timeline.field_paragraph_link?.uri,
                image: getImageFromField(
                  timeline,
                  'field_paragraph_media.field_media_image'
                ),
                dateStart: getField(
                  timeline,
                  'field_paragraph_date_range.value',
                  null
                ),
                dateEnd: getField(
                  timeline,
                  'field_paragraph_date_range.end_value',
                  null
                ),
                description: getField(timeline, 'field_paragraph_summary')
              })
            )
          : []
    },
    guidelines: {
      title: 'field_node_guidelines.field_paragraph_title',
      id: 'field_node_guidelines.id',
      accordions: (src: any) =>
        getField(
          src,
          'field_node_guidelines.field_paragraph_accordion',
          []
        ).map((acc: string) => ({
          id: getField(acc, 'id'),
          title: getField(acc, 'field_paragraph_accordion_name'),
          content: getField(acc, 'field_paragraph_accordion_body.processed', '')
        }))
    },
    documents: (src: string) =>
      getField(src, 'field_node_documents').map((doc: any) => ({
        name: doc.name,
        url: doc.field_media_file.url || doc.field_media_file.uri,
        extension: mime.extension(doc.field_media_file.filemime),
        size: humanizeFilesize(doc.field_media_file.filesize),
        id: doc.id
      })),
    sidebarComponents: ['RplSocialShare']
  },
  includes: [
    ...tidePageBaseIncludes({
      withSidebarSiteSectionNav: false,
      withSidebarContacts: true,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: true
    }),
    'field_audience',
    'field_node_guidelines',
    'field_node_timeline',
    'field_node_guidelines.field_paragraph_accordion',
    'field_node_timeline.field_timeline.field_paragraph_media.field_media_image',
    'field_node_documents.field_media_file'
  ]
}

export default tideGrantModule
