import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import {
  getBodyFromField,
  getField,
  getLinkFromField
} from '@dpc-sdp/ripple-tide-api'

type ElasticQueryDSL = Record<string, any>
type ElasticQueryDSLFilter = Record<string, any>

export interface IContentCollectionDisplay {
  type: 'list' | 'card'
  style?: 'thumbnail' | 'noImage'
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
  query: ElasticQueryDSL
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
): ElasticQueryDSLFilter[] => {
  const filters = []
  if (config.internal?.contentTypes) {
    filters.push({
      terms: {
        type: config.internal?.contentTypes
      }
    })
  }
  if (config.internal?.contentFields) {
    const contentFieldFilters = Object.keys(config.internal?.contentFields).map(
      (field) => ({
        terms: {
          [field]: config.internal?.contentFields[field].values
        }
      })
    )
    filters.push(...contentFieldFilters)
  }

  if (siteId) {
    filters.push({
      term: {
        field_node_site: siteId
      }
    })
  }

  return filters
}

const getContentCollectionSortBy = (config) => {
  const sort = [
    {
      [getField(config, 'internal.sort.field', 'created')]: getField(
        config,
        'internal.sort.direction',
        'desc'
      )
    }
  ]

  if (getField(config, 'internal.contentTypes', []).includes('news')) {
    sort.unshift({
      field_news_date: getField(config, 'internal.sort.direction', 'desc')
    })
  }

  return sort
}

const getSearchQuery = (
  config: ITideContentCollectionConfig,
  pageSize: number,
  siteId?: string
): ElasticQueryDSL[] => {
  const filters = getContentCollectionFiltersFromConfig(config, siteId)

  return {
    query: {
      bool: {
        filter: filters.map((f) => ({
          bool: {
            should: [f]
          }
        }))
      }
    },
    size: pageSize,
    from: 0,
    sort: getContentCollectionSortBy(config)
  }
}

export const contentCollectionMapping = (
  field,
  pageData,
  TidePageApi
): TideDynamicPageComponent<IContentCollection> => {
  const pageSize = getField(
    field,
    'field_content_collection_config.internal.itemsToLoad',
    6
  )

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
      searchQuery: getSearchQuery(
        field.field_content_collection_config,
        pageSize,
        TidePageApi?.site
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
