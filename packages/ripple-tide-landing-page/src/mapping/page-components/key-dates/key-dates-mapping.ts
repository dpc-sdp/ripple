import {
  getField,
  getLinkFromField,
  TideDynamicPageComponent
} from '@dpc-sdp/ripple-tide-api'

export interface ITideKeyDates {
  title: string
  ctaTitle: string
  url: string
  items: Array<{
    subtitle: string
    title: string
    content: string
  }>
}

export const keyDatesMapping = (
  field
): TideDynamicPageComponent<ITideKeyDates> => {
  const link = getLinkFromField(field, 'field_paragraph_cta')
  return {
    component: 'RplCardKeyDatesCard',
    id: field.drupal_internal__id.toString(),
    title: field.field_paragraph_title,
    props: {
      title: 'Key calendar dates',
      items: getField(field, 'field_paragraph_keydates', []).map((item) => {
        return {
          title: item.field_paragraph_title,
          subtitle: item.field_paragraph_keydate,
          content: item.field_paragraph_summary
        }
      }),
      ctaTitle: link.text,
      url: link.url
    }
  }
}

export const keyDatesIncludes = [
  'field_landing_page_component.field_paragraph_keydates'
]
