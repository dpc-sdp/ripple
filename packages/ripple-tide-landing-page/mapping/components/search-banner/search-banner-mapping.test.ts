import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from 'vitest'
import { searchBannerMapping, ITideSearchBanner } from './search-banner-mapping'

const rawData = {
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/embedded_search_form/2ef397d8-2fd0-40c6-8834-4ad4a374e0d2'
    }
  },
  meta: {
    target_revision_id: 2577
  },
  drupal_internal__id: 1914,
  drupal_internal__revision_id: 2577,
  langcode: 'en',
  status: true,
  created: '2022-11-14T05:16:18+00:00',
  parent_id: '65',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_header',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: true,
  field_paragraph_search_block: 'none',
  field_paragraph_search_ph: 'Test placeholder',
  field_paragraph_search_target: false,
  field_paragraph_search_url:
    'https://www.google.com.au/search?q=[SEARCH-KEYWORDS]',
  id: '2ef397d8-2fd0-40c6-8834-4ad4a374e0d2',
  type: 'paragraph--embedded_search_form'
}

describe('searchBannerMapping', () => {
  it('full site search', () => {
    const result: TideDynamicPageComponent<ITideSearchBanner> = {
      component: 'TideLandingPageSearchBanner',
      id: '1914',
      props: {
        placeholder: 'Search all',
        searchUrl: '/search?q=[SEARCH-KEYWORDS]',
        openInNewWindow: false
      }
    }

    expect(searchBannerMapping(rawData)).toEqual(result)
  })

  it('news search', () => {
    const result: TideDynamicPageComponent<ITideSearchBanner> = {
      component: 'TideLandingPageSearchBanner',
      id: '1914',
      props: {
        placeholder: 'Search all news',
        searchUrl: '/search?q=[SEARCH-KEYWORDS]&filters[type]=news',
        openInNewWindow: false
      }
    }

    expect(
      searchBannerMapping({ ...rawData, field_paragraph_search_block: 'news' })
    ).toEqual(result)
  })

  it('event search', () => {
    const result: TideDynamicPageComponent<ITideSearchBanner> = {
      component: 'TideLandingPageSearchBanner',
      id: '1914',
      props: {
        placeholder: 'Search all events',
        searchUrl: '/whatson?q=[SEARCH-KEYWORDS]',
        openInNewWindow: false
      }
    }

    expect(
      searchBannerMapping({ ...rawData, field_paragraph_search_block: 'event' })
    ).toEqual(result)
  })

  it('custom search', () => {
    const result: TideDynamicPageComponent<ITideSearchBanner> = {
      component: 'TideLandingPageSearchBanner',
      id: '1914',
      props: {
        placeholder: 'Test placeholder',
        searchUrl: 'https://www.google.com.au/search?q=[SEARCH-KEYWORDS]',
        openInNewWindow: false
      }
    }

    expect(
      searchBannerMapping({
        ...rawData,
        field_paragraph_search_block: 'custom'
      })
    ).toEqual(result)
  })

  it('open in new window', () => {
    const result: TideDynamicPageComponent<ITideSearchBanner> = {
      component: 'TideLandingPageSearchBanner',
      id: '1914',
      props: {
        placeholder: 'Test placeholder',
        searchUrl: 'https://www.google.com.au/search?q=[SEARCH-KEYWORDS]',
        openInNewWindow: true
      }
    }

    expect(
      searchBannerMapping({
        ...rawData,
        field_paragraph_search_block: 'custom',
        field_paragraph_search_target: true
      })
    ).toEqual(result)
  })
})
