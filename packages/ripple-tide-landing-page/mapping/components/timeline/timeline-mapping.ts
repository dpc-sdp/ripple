import {
  getBody,
  getLinkFromField,
  getImageFromField
} from '@dpc-sdp/ripple-tide-api'
import {
  TideDynamicPageComponent,
  TideImageField
} from '@dpc-sdp/ripple-tide-api/types'

interface ITideTimelineItem {
  id: string
  image: TideImageField
  title: string
  subtitle: string | null
  dateStart: string | null
  dateEnd: string | null
  current: boolean
  description: string
  url: string
}

export interface ITideTimeline {
  items: ITideTimelineItem[]
}

export const timelineMapping = (
  field
): TideDynamicPageComponent<ITideTimeline> => {
  return {
    component: 'TideLandingPageTimeline',
    id: `${field.drupal_internal__id}`,
    title: field.field_paragraph_title,
    props: {
      items: (field.field_timeline || []).map((item): ITideTimelineItem => {
        const link = getLinkFromField(item.field_paragraph_link)

        return {
          id: `${item.drupal_internal__id}`,
          title: item.field_paragraph_title,
          subtitle: item.field_paragraph_cta_text,
          url: link?.url || '',
          description: getBody(item.field_paragraph_body?.processed),
          image: getImageFromField(
            item,
            'field_paragraph_media.field_media_image'
          ),
          current: item.field_current_milestone,
          dateStart: item.field_paragraph_date_range?.value || null,
          dateEnd: item.field_paragraph_date_range?.end_value || null
        }
      })
    }
  }
}

export const timelineIncludes = [
  'field_landing_page_component.field_timeline.field_paragraph_media.field_media_image'
]

export default {
  includes: timelineIncludes,
  mapping: timelineMapping,
  contentTypes: ['landing_page']
}
