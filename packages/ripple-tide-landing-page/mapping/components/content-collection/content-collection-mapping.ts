import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { getBodyFromField, getField } from '@dpc-sdp/ripple-tide-api'

export interface IContentCollectionDisplay {
  component: 'RplSearchResult' | 'RplPromoCard'
  style?: 'thumbnail' | 'noImage'
}

export interface IContentCollectionFilter {
  type?: 'any' | 'all'
  field: string
  values: string[] | number[]
}

export interface IContentCollectionSort {
  field: string
  direction: 'asc' | 'desc'
}

export interface IContentCollection {
  description?: string
  link?: {
    text: string
    url: string
  }
  display: IContentCollectionDisplay
  perPage?: number
  filters?: IContentCollectionFilter[]
  sortBy?: IContentCollectionSort
}

export interface ITideContentCollectionFilterConfig {
  field: string
  values: string[] | number[]
  operator?: 'AND' | 'OR'
}

export interface ITideContentCollectionConfig {
  title?: string
  internal: {
    contentTypes: string[]
    contentFields: ITideContentCollectionFilterConfig[]
    sort: IContentCollectionSort
  }
}

const getContentCollectionFiltersFromConfig = (
  config: ITideContentCollectionConfig
): IContentCollectionFilter[] => {
  const filters = []
  if (config.internal?.contentTypes) {
    filters.push({
      type: 'any',
      field: 'type',
      values: config.internal?.contentTypes
    })
  }
  if (config.internal?.contentFields) {
    const contentFieldFilters = Object.keys(config.internal?.contentFields).map(
      (field) => {
        const type =
          config.internal?.contentFields[field].operator === 'OR'
            ? 'any'
            : 'all'
        return {
          type,
          field,
          values: config.internal?.contentFields[field].values
        }
      }
    )
    filters.push(...contentFieldFilters)
  }
  return filters
}

export const contentCollectionMapping = (
  field
): TideDynamicPageComponent<IContentCollection> => {
  return {
    component: 'TideLandingPageContentCollection',
    id: field.drupal_internal__id.toString(),
    title: field.field_cc_enhanced_title,
    props: {
      description: getBodyFromField(field, ['field_cc_enhanced_description']),
      // TODO: The below isn't support yet, so we're faking for now to test
      // this needs to be updated when the backend support its
      // link: getLinkFromField(field, [
      //   'field_content_collection_config',
      //   'callToAction'
      // ]),
      link: {
        text: 'View all',
        url: '#'
      },
      filters: getContentCollectionFiltersFromConfig(
        field.field_content_collection_config
      ),
      sortBy: {
        field: getField(
          field,
          'field.field_content_collection_config.internal.sort.field',
          'created'
        ),
        direction: getField(
          field,
          'field.field_content_collection_config.internal.sort.direction',
          'desc'
        )
      },
      // TODO: The below perPage path isn't support yet
      // This path will need to be updated when backend support has been added
      perPage: getField(
        field,
        'field_content_collection_config.interface.display.resultComponent.number',
        6
      ),
      display: {
        component:
          getField(
            field,
            'field_content_collection_config.interface.display.resultComponent.type',
            'card'
          ) === 'search-result'
            ? 'RplSearchResult'
            : 'RplPromoCard',
        style: getField(
          field,
          'field_content_collection_config.interface.display.resultComponent.style',
          null
        )
      }
    }
  }
}

export const contentCollectionIncludes = []

export default {
  includes: contentCollectionIncludes,
  mapping: contentCollectionMapping,
  contentTypes: ['landing_page']
}
