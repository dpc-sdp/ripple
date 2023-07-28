import { FilterType, FacetConfiguration } from '@elastic/search-ui'
import type { TidePageBase, TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
export interface MappedSearchResult<T> {
  id: string
  component: string
  props: T
}

export interface AppSearchFilterConfigItem {
  label: string
  field: string
  filterType: FilterType
}

export interface FilterConfigItem {
  /**
   * @description this id will be what shows up in the URL, it should be human readable and must unique among the other filters
   */
  id: string
  /**
   * @description name of the Vue component used to render the filter
   */
  component: 'TideSearchFilterDropdown' | string
  aggregations?: {
    /**
     * @description source of options data for dropdowns, taxonomy for deriving from Drupal and Elastic to get from aggregation query in Elasticsearch
     */
    source: 'elastic' | 'taxonomy'
    field: string
    /**
     * @description number of items to fetch
     */
    size?: number
  }
  /**
   * @description the relevant props that will be passed into the Vue component (see `component` key)
   */
  props?: {
    [key: string]: unknown
  }
}

export type TideSearchListingResultItem = {
  /**
   * @description search result key
   */
  id?: string
  /**
   * @description name of Vue component (globally imported) to render result
   */
  component: string
  /**
   * @description optionally pass props to component (useful for configuring an existing component)
   */
  props?: {
    [key: string]: unknown
  }
}

export type TideSearchListingResultLayout = {
  /**
   * @description name of Vue component (globally imported) to render result
   */
  component:
    | 'TideSearchResultsList'
    | 'TideSearchResultsGrid'
    | 'TideSearchResultsTable'
    | string
  /**
   * @description optionally pass props to component (useful for configuring an existing component)
   */
  props?: {
    [key: string]: unknown
  }
}

export type TideSearchListingConfig = {
  /**
   * @description optional page level config
   */
  searchListingConfig: {
    /**
     * @description Toggle grid and list view of results, cards need to be a grid view
     */
    resultsPerPage?: number
    labels: {
      submit: string
      reset: string
      placeholder: string
    }
    /**
     * @description custom sort clause
     */
    customSort?: Record<string, 'asc' | 'desc'>[]
  }
  /**
   * @description Elastic Query DSL for query clause
   */
  queryConfig: Record<string, any>
  /**
   * @description Global filters to apply to ES Query DSL Filter clause
   */
  globalFilters: Record<string, any>[]
  /**
   * @description Filter config for the user facing filter controls
   */
  userFilters: FilterConfigItem[]
  /**
   * @description Config for how to display results
   */
  results: {
    /**
     * @description Component to render results layout
     */
    layout?: TideSearchListingResultLayout
    /**
     * @description Component to render result items, can be either '*' for all types, or the content type name if you need to render different types of results differently
     */
    item?: {
      [key: string]: TideSearchListingResultItem
    }
  }
}

export interface TideSearchListingPage extends TidePageBase {
  title: string
  summary: string
  config: TideSearchListingConfig
  contentPage: TidePageBase
  site: TideSiteData
}
