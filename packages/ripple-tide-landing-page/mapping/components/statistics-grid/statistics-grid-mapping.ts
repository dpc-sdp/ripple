import { getField } from '@dpc-sdp/ripple-tide-api'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'

export interface ITideStatsGrid {
  variant: 'onLight' | 'onDark'
  items: Array<{
    id: string
    label: string
    value: string
  }>
}

export const statisticsGridMapping = (
  field
): TideDynamicPageComponent<ITideStatsGrid> => {
  // `field_statistics_grid_theme` is actually a boolean,
  // -> false = white on grey
  // -> true = grey on white
  const greyOnWhite = field.field_statistics_grid_theme

  return {
    component: 'TideLandingPageStatsGrid',
    id: field.drupal_internal__id.toString(),
    props: {
      variant: greyOnWhite ? 'onLight' : 'onDark',
      items: getField(field, 'field_statistic_block', []).map((item) => {
        return {
          id: item.drupal_internal__id.toString(),
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

export default {
  includes: statisticsGridIncludes,
  mapping: statisticsGridMapping,
  contentTypes: ['landing_page']
}
