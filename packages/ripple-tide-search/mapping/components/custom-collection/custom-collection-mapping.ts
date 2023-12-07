import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'

export const customCollectionMapping = (
  field
): TideDynamicPageComponent<any> => {
  return {
    component: 'TideCustomCollection',
    id: field.drupal_internal__id.toString(),
    props: {
      id: field.drupal_internal__id.toString(),
      ...field.field_content_collection_config
    }
  }
}

export const customCollectionIncludes = []

export default {
  includes: customCollectionIncludes,
  mapping: customCollectionMapping,
  contentTypes: ['landing_page']
}
