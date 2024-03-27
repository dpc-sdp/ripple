import { FilterType } from '@elastic/search-ui'
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
  filter?: {
    type: 'raw' | 'term' | 'terms' | 'dependent' | 'function' | 'prefix'
    value: string
    /**
     * Can multiple options be selected?
     */
    multiple: boolean
    /**
     * @description if true, this filter won't be sent when getting the aggregrations (dropdown options) from elastic,
     * this is so that the filter doesn't affect the options available in its own dropdown.
     * Only relevant if `searchListingConfig.dynamicAggregations` is true
     */
    excludeFromAggregations?: boolean
  }
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
    [key: string]: any
  }
}

export type TideSearchListingResultsConfig = {
  /**
   * @description Component to render the results layout
   */
  layout?: TideSearchListingResultLayout
  /**
   * @description Component to render no results layout
   */
  empty?: any
  /**
   * @description Component to render result items, can be either '*' for all types, or the content type name if you need to render different types of results differently
   */
  item?: {
    [key: string]: TideSearchListingResultItem
  }
}

export type TideSearchListingLayoutConfig = {
  /**
   * @description Arbitrary component to render in the page header, below filters
   */
  belowFilter?: any
}

export type TideSearchListingResultItem = {
  /**
   * @description search result key
   */
  id?: string
  /**
   * @description name of Vue component (globally imported) to render result
   */
  component?: string
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

export type TideSearchListingSortOption = {
  id: string
  label: string
  clause?: any
  function?: string
}

export type TideSearchLocationQueryConfig = {
  component?: string
  props?: {
    [key: string]: unknown
  }
  dslTransformFn?: (location: any) => any
}

export type TideSearchListingTab = {
  title: string
  key: TideSearchListingTabKey
  icon: string
}

export type TideSearchListingMapConfig = {
  /**
   * @description name of a function in appConfig.ripple.search.mapResultHooks
   * that is called whenever the map results are updated
   *
   * The function is passed:
   * - the map instance
   * - the new results
   * - the location query
   *
   * This is useful for customising the zoom behaviour of the map, for example zooming
   * to the nearest item.
   */
  onResultsHook?: string
  sidePanel?: {
    enabled: boolean
    resultsComponent?: string
  }
  props?: {
    [key: string]: unknown
  }
}

export type TideSearchListingTabKey = 'map' | 'listing'

export type TideSearchListingConfig = {
  /**
   * @description general configuration for search listing
   */
  searchListingConfig: {
    /**
     * @description Search provider used for queries - either elasticsearch or elastic app search
     * @default 'app-search' defaults to app-search
     */
    searchProvider: 'elasticsearch' | 'app-search'
    /**
     * @description Custom search index to use - EG for data pipelines
     */
    index: string
    /**
     * @description Set the number of results to show per page
     */
    resultsPerPage?: number
    /**
     * @description Override the default labels
     */
    labels: {
      submit: string
      reset: string
      placeholder: string
    }
    /**
     * @description custom sort clause
     */
    customSort?: Record<string, 'asc' | 'desc'>[]
    /**
     * @description whether to display map tab and include map search results
     */
    displayMapTab?: boolean
    /**
     * @description which tab to display by default if not specified in URL
     */
    defaultTab?: TideSearchListingTabKey
    /**
     * @description optionally hide the search form
     */
    hideSearchForm?: boolean
    /**
     * @description options for utilizing the auto suggestions
     */
    suggestions: {
      key: string
      enabled: boolean
    }
    /**
     * @description The theme to use for the display of form section and fields
     */
    formTheme: 'default' | 'reverse'
    /**
     * @description Whether the filter dropdown options should be dynamic based on the current search results, also displays a count of results for each option
     */
    dynamicAggregations?: boolean
    /**
     * @description Filter panel open on page load
     */
    showFiltersOnLoad: boolean
  }
  /**
   * @description Tabs to display, key needs to be one of TideSearchListingTabKey
   */
  tabs: TideSearchListingTab[]
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
   * @deprecated please use resultsConfig instead
   */
  results: TideSearchListingResultsConfig
  /**
   * @description Config for how to display results
   */
  resultsConfig: TideSearchListingResultsConfig
  /**
   * @description Config for layout components
   */
  layoutConfig?: TideSearchListingLayoutConfig
  /**
   * @description Config for custom sort options
   */
  sortOptions?: TideSearchListingSortOption[]
  /**
   * @description Config for the location query
   */
  locationQueryConfig?: TideSearchLocationQueryConfig
  /**
   * @description Config for results map
   */
  mapConfig?: TideSearchListingMapConfig
}

export interface TideSearchListingPage extends TidePageBase {
  title: string
  introText: string
  summary: string
  config: TideSearchListingConfig
  contentPage: TidePageBase
  site: TideSiteData
}
