import { getBody, getLinkFromField, getField } from '@dpc-sdp/ripple-tide-api'
import {
  TideDynamicPageComponent,
  TideUrlField
} from '@dpc-sdp/ripple-tide-api/types'

export interface ITideIntroBanner {
  title: string
  withIcon: boolean
  links: {
    title: string
    items: TideUrlField[]
    type: 'link' | 'button'
    more: TideUrlField | null
  }
  html: string | null
}

export const introBannerMapping = (
  field
): TideDynamicPageComponent<ITideIntroBanner> => {
  return {
    component: 'TideLandingPageIntroBanner',
    id: `${field.drupal_internal__id}`,
    props: {
      title: field?.field_paragraph_title,
      withIcon: field.field_banner_type === 'with_icon',
      links: {
        title: getField(field, 'field_call_to_action_title', ''),
        items: (field.field_paragraph_links || []).map((link): TideUrlField => {
          return getLinkFromField(link)
        }),
        type:
          field.field_banner_display_type === 'featured_links'
            ? 'link'
            : 'button',
        more: getLinkFromField(field, ['field_paragraph_cta'])
      },
      html: getBody(field?.field_paragraph_body?.processed)
    }
  }
}

export const introBannerIncludes = []

export default {
  includes: introBannerIncludes,
  mapping: introBannerMapping,
  contentTypes: ['landing_page']
}
