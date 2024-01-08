import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { processConfig } from './../../utils'
export const customCollectionMapping = async (
  field,
  page,
  tidePageApi
): TideDynamicPageComponent<any> => {
  const config = await processConfig(
    field.field_content_collection_config,
    tidePageApi
  )

  return {
    component: 'TideCustomCollection',
    id: field.drupal_internal__id.toString(),
    props: {
      id: field.drupal_internal__id.toString(),
      ...config
    }
  }
}

export const customCollectionIncludes = []

export default {
  includes: customCollectionIncludes,
  mapping: customCollectionMapping,
  contentTypes: ['landing_page']
}
