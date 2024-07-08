import * as jsonapiParse from 'jsonapi-parse'
import { expect, describe, it } from '@jest/globals'
import { heroHeaderMapping } from '../hero-header-mapping'
import { TideHeroHeader } from '@dpc-sdp/nuxt-ripple/types'
import { testData } from './test-data'

const result: TideHeroHeader = {
  title: 'Ripple 2 landing page title',
  summary: "Here's the introduction text",
  links: {
    title: 'And here are some header links!',
    items: [
      {
        text: 'Test link 1',
        url: '/sdpta-publication-test-content-publication-08-10-2022-0'
      },
      {
        text: 'Test link 2',
        url: '/sdpta-test-parent-publication-page-13-10-2022-0'
      }
    ],
    more: {
      text: 'Test header CTA',
      url: '/clone-sdpta-113-clone-landing-page-31-10-2022-0'
    }
  },
  theme: 'default',
  logoImage: {
    src: '/sites/default/files/tide_demo_content/Parliament-of-Victoria.jpg',
    alt: 'Demo: Parliament of Victoria',
    title: 'Demo: Parliament of Victoria',
    width: 1650,
    height: 915
  },
  backgroundImage: null,
  backgroundImageCaption: '',
  cornerTop: {
    src: '/sites/default/files/tide_demo_content/Aerial-shot-of-new-housing-development.jpg',
    alt: 'Demo: Aerial shot of new housing development',
    title: 'Demo: Aerial shot of new housing development',
    width: 1024,
    height: 571
  },
  cornerBottom: {
    src: '/sites/default/files/tide_demo_content/VicFleet-Police-car-on-road.jpg',
    alt: 'Demo: VicFleet - Police car on road',
    title: 'Demo: VicFleet - Police car on road',
    width: 1065,
    height: 617
  },
  primaryAction: {
    text: 'Testing call to action',
    url: '/sdpta-content-collection-lp-grid-view-thumbnail-site-section-1-landing-page-fixture'
  },
  secondaryAction: {
    text: 'Testing some link text',
    url: '/sdpta-content-rating-landing-page-10-10-2022-3'
  },
  secondaryActionLabel: 'Just some free text'
}

describe('heroHeaderMapping', () => {
  let parsedData

  beforeAll(() => {
    parsedData = jsonapiParse.parse(testData).data
  })

  it('maps a raw json api response to the correct structure', () => {
    expect(heroHeaderMapping(parsedData)).toEqual(result)
  })

  it('correctly maps header theme value', () => {
    expect(
      heroHeaderMapping({
        ...parsedData,
        field_landing_page_hero_theme: 'dark'
      })
    ).toEqual({ ...result, theme: 'reverse' })
  })
})
