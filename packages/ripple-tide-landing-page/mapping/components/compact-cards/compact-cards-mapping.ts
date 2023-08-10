import { getImageFromField } from '@dpc-sdp/ripple-tide-api'
import {
  TideDynamicPageComponent,
  TideImageField
} from '@dpc-sdp/ripple-tide-api/types'

export interface ITideCompactCard {
  title: string
  summary?: string
  image?: TideImageField
  url: string
}

export interface ITideCompactCards {
  items: ITideCompactCard[]
}

export const compactCardsMapping = (
  field
): TideDynamicPageComponent<ITideCompactCards> => {
  return {
    component: 'TideLandingPageCategoryGrid',
    id: field.drupal_internal__id.toString(),
    title: field?.field_paragraph_title,
    props: {
      items: field.field_compact_card.map((item) => {
        return {
          title: item.field_paragraph_title,
          summary: item?.field_paragraph_summary,
          image: getImageFromField(
            item,
            'field_paragraph_media.field_media_image'
          ),
          url: item.field_paragraph_link?.url
        }
      })
    }
  }
}

export const compactCardsIncludes = [
  'field_landing_page_component.field_compact_card',
  'field_landing_page_component.field_compact_card.field_paragraph_media.field_media_image'
]

export default {
  includes: compactCardsIncludes,
  mapping: compactCardsMapping,
  contentTypes: ['landing_page']
}
