import { getField, TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api'

export const statisticsGridMapping = (field): TideDynamicPageComponent<any> => {
  const theme = getField(field, 'field_statistics_grid_theme', '')

  return {
    component: 'TideLandingPageStatsGrid',
    id: field.drupal_internal__id.toString(),
    title: field.field_paragraph_title,
    props: {
      variant: theme === 'white' ? 'onDark' : 'onLight',
      items: getField(field, 'field_statistic_block', []).map((item) => {
        return {
          id: item.drupal_internal__id,
          label: item.field_statistic_body,
          value: item.field_statistic_heading
        }
      })
    }
  }
}

export const statisticsGridIncludes = [
  'field_landing_page_component.field_statistic_block'
]
