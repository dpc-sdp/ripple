import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { getSearchListingConfig } from './../../utils'

export const customCollectionMapping = (
  field
): TideDynamicPageComponent<any> => {
  return {
    component: 'TideCustomCollection',
    id: field.drupal_internal__id.toString(),
    props: {
      // ...getSearchListingConfig(field.field_custom_collection_config)
      // TODO: This is hard coded here for demo purposes until we can update the JSON schema on the backend to support the fields here
      searchListingConfig: {
        searchProvider: 'elasticsearch',
        index: 'sdp_data_pipelines_scl',
        resultsPerPage: 5,
        labels: {
          submit: 'Search',
          placeholder: 'Enter suburb, postcode, streetname or offence location'
        }
      },
      queryConfig: {
        multi_match: {
          query: '{{query}}',
          fields: ['suburb^3', 'street^2', 'offence_location']
        }
      },
      resultsConfig: {
        layout: {
          component: 'TideSearchResultsTable',
          props: {
            columns: [
              {
                label: 'Suburb',
                key: 'suburb'
              },
              {
                label: 'Location',
                key: 'street'
              },
              {
                label: 'Last annual test',
                key: 'last_annual_test'
              },
              {
                label: 'Certificate',
                key: 'certificate',
                component: 'CSLCertificateLink'
              }
            ]
          }
        }
      }
    }
  }
}

export const customCollectionIncludes = []

export default {
  includes: customCollectionIncludes,
  mapping: customCollectionMapping,
  contentTypes: ['landing_page']
}
