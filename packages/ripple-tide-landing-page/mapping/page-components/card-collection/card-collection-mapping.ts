import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import {
  getBodyFromField,
  getLinkFromField,
  getField
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

export interface IContentCollectionConfig {
  description?: string
  link?: {
    text: string
    url: string
  }
  filters?: IContentCollectionFilter[]
}

export interface ITideFieldContentCollectionConfig {
  title?: string
  internal: {
    contentTypes: string[]
    contentFields: Record<string, IContentCollectionFilter>
    sort: Record<string, IContentCollectionSort>[]
  }
}

const getCardCollectionFiltersFromConfig = (
  config: ITideFieldContentCollectionConfig
): IContentCollectionFilter[] => {
  const filters = []
  if (config.internal?.contentTypes) {
    filters.push({
      field: 'type',
      values: config.internal?.contentTypes
    })
  }
  if (config.internal?.contentFields) {
    const contentFieldFilters = Object.keys(config.internal?.contentFields).map(
      (key) => ({
        field: key,
        values: config.internal?.contentFields[key].values
      })
    )
    filters.push(...contentFieldFilters)
  }
  return filters
}

export const cardCollectionMapping = async (
  field,
  page,
  tidePageApi
): Promise<TideDynamicPageComponent<IContentCollectionConfig>> => {
  return {
    component: 'TideLandingPageCardCollection',
    id: field.drupal_internal__id.toString(),
    title: field.field_cc_enhanced_title,
    props: {
      description: getBodyFromField(field, ['field_cc_enhanced_description']),
      link: getLinkFromField(field, [
        'field_content_collection_config',
        'callToAction'
      ]),
      filters: getCardCollectionFiltersFromConfig(
        field.field_content_collection_config
      )
    }
  }
}

export const cardCollectionIncludes = []
