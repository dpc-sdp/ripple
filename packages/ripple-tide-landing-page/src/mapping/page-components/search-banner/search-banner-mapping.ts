import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'

export interface ITideSearchBanner {
  placeholder: string
  searchUrl: string
  openInNewWindow: boolean
}

const getPlaceholder = (field): string => {
  switch (field.field_paragraph_search_block) {
    case 'none':
      return 'Search all'
    case 'news':
      return 'Search all news'
    case 'event':
      return 'Search all events'
    case 'custom':
    default:
      return field.field_paragraph_search_ph
  }
}

const getSearchUrl = (field): string => {
  switch (field.field_paragraph_search_block) {
    case 'custom':
      return field.field_paragraph_search_url
    case 'news':
      return '/search?q=[SEARCH-KEYWORDS]&filters[type]=news'
    case 'event':
      return '/whatson?q=[SEARCH-KEYWORDS]'
    case 'none':
    default:
      return '/search?q=[SEARCH-KEYWORDS]'
  }
}

export const searchBannerMapping = (
  field
): TideDynamicPageComponent<ITideSearchBanner> => {
  return {
    component: 'TideLandingPageSearchBanner',
    id: `${field.drupal_internal__id}`,
    props: {
      placeholder: getPlaceholder(field),
      searchUrl: getSearchUrl(field),
      openInNewWindow: field.field_paragraph_search_target
    }
  }
}

export const searchBannerIncludes = []
