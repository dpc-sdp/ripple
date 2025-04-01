import { getField, getLinkFromField } from '@dpc-sdp/ripple-tide-api'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'

export interface ITideLinkList {
  items: Array<{
    id: string
    text: string
    url: string
  }>
}

export const linkListMapping = (
  field
): TideDynamicPageComponent<ITideLinkList> => {
  return {
    component: 'TideLandingPageLinkList',
    id: field.drupal_internal__id.toString(),
    title: field.field_paragraph_title,
    props: {
      items: getField(field, 'field_paragraph_link_list', []).map((item) => {
        const link = getLinkFromField(item, 'field_paragraph_link')
        return {
          id: item.drupal_internal__id.toString(),
          text: link.text,
          url: link.url
        }
      })
    }
  }
}

export const linkListIncludes = [
  'field_landing_page_component.field_paragraph_link_list'
]

export default {
  includes: linkListIncludes,
  mapping: linkListMapping,
  contentTypes: ['landing_page']
}
