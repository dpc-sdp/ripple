import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import {
  getBodyFromField,
  getField,
  getLinkFromField
} from '@dpc-sdp/ripple-tide-api'

export interface IContentCollectionFilter {
  field: string
  values: string[] | number[]
  operator?: 'OR' | 'AND'
}

export interface IContentCollectionSort {
  field: string
  direction: 'asc' | 'desc'
}

export interface IContentCollectionDisplay {
  type: 'card' | 'search-result'
  style?: 'thumbnail' | 'noImage'
}

export interface IContentCollectionConfig {
  description?: string
  link?: {
    text: string
    url: string
  }
  filters?: IContentCollectionFilter[]
  sortBy?: IContentCollectionSort
  perPage?: number
  display: IContentCollectionDisplay
}

export interface ITideFieldContentCollectionConfig {
  title?: string
  internal: {
    contentTypes: string[]
    contentFields: Record<string, IContentCollectionFilter>
    sort: Record<string, IContentCollectionSort>[]
  }
}

const getContentCollectionFiltersFromConfig = (
  config: ITideFieldContentCollectionConfig
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

export const contentCollectionMapping = async (
  field,
  page,
  tidePageApi
): Promise<TideDynamicPageComponent<IContentCollectionConfig>> => {
  return {
    component: 'TideLandingPageContentCollection',
    id: field.drupal_internal__id.toString(),
    title: field.field_cc_enhanced_title,
    props: {
      description: getBodyFromField(field, ['field_cc_enhanced_description']),
      // The below isn't support yet, so we're faking for now to test
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
      // The below perPage path isn't support yet
      perPage: getField(
        field,
        'field_content_collection_config.interface.display.resultComponent.number',
        6
      ),
      display: {
        type: getField(
          field,
          'field_content_collection_config.interface.display.resultComponent.type',
          'card'
        ),
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
