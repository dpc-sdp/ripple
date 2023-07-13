import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import {
  getBodyFromField,
  getField,
  getLinkFromField
} from '@dpc-sdp/ripple-tide-api'

export interface IContentCollectionDisplay {
  type: 'list' | 'card'
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
  sortBy?: IContentCollectionSort[]
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
  config: ITideContentCollectionConfig,
  siteId?: string
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
      (field) => ({
        field,
        type: 'any',
        values: config.internal?.contentFields[field].values
      })
    )
    filters.push(...contentFieldFilters)
  }

  if (siteId) {
    filters.push({
      type: 'any',
      field: 'field_node_site',
      values: [siteId]
    })
  }

  return filters
}

const getContentCollectionSortBy = (config) => {
  const sort = [
    {
      field: getField(config, 'internal.sort.field', 'created'),
      direction: getField(config, 'internal.sort.direction', 'desc')
    }
  ]

  if (getField(config, 'internal.contentTypes', []).includes('news')) {
    sort.unshift({
      field: 'field_news_date',
      direction: getField(config, 'internal.sort.direction', 'desc')
    })
  }

  return sort
}

export const contentCollectionMapping = (
  field,
  pageData,
  TidePageApi
): TideDynamicPageComponent<IContentCollection> => {
  return {
    component: 'TideLandingPageContentCollection',
    id: field.drupal_internal__id.toString(),
    title: field.field_cc_enhanced_title,
    props: {
      description: getBodyFromField(field, ['field_cc_enhanced_description']),
      link: getLinkFromField(field, [
        'field_content_collection_config',
        'callToAction'
      ]),
      filters: getContentCollectionFiltersFromConfig(
        field.field_content_collection_config,
        TidePageApi?.site
      ),
      sortBy: getContentCollectionSortBy(field.field_content_collection_config),
      perPage: getField(
        field,
        'field_content_collection_config.internal.itemsToLoad',
        6
      ),
      display: {
        type:
          getField(
            field,
            'field_content_collection_config.interface.display.resultComponent.type',
            'card'
          ) === 'search-result'
            ? 'list'
            : 'card',
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
