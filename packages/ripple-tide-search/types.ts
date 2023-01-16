import { FilterType } from '@elastic/search-ui'

export interface MappedSearchResult<T> {
  id: string
  component: string
  props: T
}

export interface FilterConfigItem {
  label: string
  field: string
  filterType: FilterType
}
