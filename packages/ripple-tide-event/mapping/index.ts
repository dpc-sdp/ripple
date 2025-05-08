import {
  getAddress,
  getField,
  getBodyFromField,
  getLinkFromField
} from '@dpc-sdp/ripple-tide-api'
import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'
import { formatPriceRange } from '@dpc-sdp/nuxt-ripple/mapping/utils'
import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'

const tideEventModule: IRplTideModuleMapping = {
  mapping: {
    ...tidePageBaseMapping({
      withSidebarContacts: true,
      withSidebarRelatedLinks: true,
      withSidebarSocialShare: true
    }),
    url: 'path.url',
    summary: 'field_landing_page_summary',
    showInPageNav: 'field_show_table_of_content',
    inPageNavHeadingLevel: (src) => {
      if (src.field_node_display_headings === 'showH2AndH3') {
        return 'h3'
      }
      return 'h2'
    },
    date: {
      from: 'field_event_details[0].field_paragraph_date_range.value',
      to: 'field_event_details[0].field_paragraph_date_range.end_value'
    },
    showTime: 'field_event_details[0].field_show_time',
    overview: (src: string) =>
      getField(src, 'field_event_details').map((node: any) => [
        {
          term: 'Price:',
          description: formatPriceRange(
            node.field_paragraph_event_price_from,
            node.field_paragraph_event_price_to
          )
        },
        {
          term: 'Location:',
          description: node.field_paragraph_location
            ? getAddress(node.field_paragraph_location)
            : ''
        }
      ])[0],
    details: (src: string) =>
      getField(src, 'field_event_details[0].field_event_requirements').map(
        (node: any) => node.name
      ),
    description: (src: string) =>
      getBodyFromField(src, 'field_event_description'),
    body: (src: string) => getBodyFromField(src, 'body'),
    websiteURL: (src: string) => getLinkFromField(src, 'field_node_link'),
    bookingURL: (src: string) =>
      getLinkFromField(src, 'field_event_details[0].field_paragraph_link'),
    showLastUpdated: () => true
  },
  includes: [
    ...tidePageBaseIncludes({
      withSidebarContacts: true,
      withSidebarRelatedLinks: true,
      withSidebarSocialShare: true
    }),
    'field_event_details',
    'field_featured_image',
    'field_event_details.field_event_requirements'
  ]
}

export default tideEventModule
