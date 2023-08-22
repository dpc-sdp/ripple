import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { parseJSONField } from './../../utils'

export const customCollectionMapping = (
  field
): TideDynamicPageComponent<any> => {
  return {
    component: 'TideCustomCollection',
    id: field.drupal_internal__id.toString(),
    props: {
      ...parseJSONField(field.field_custom_collection_config)
    }
  }
}

export const customCollectionIncludes = []

export default {
  includes: customCollectionIncludes,
  mapping: customCollectionMapping,
  contentTypes: ['landing_page']
}
