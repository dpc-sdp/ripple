import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from 'vitest'
import { complexImageMapping, ITideComplexImage } from './complex-image-mapping'
import rawData from './complex-image'

const result: TideDynamicPageComponent<ITideComplexImage> = {
  component: 'TideLandingPageMediaEmbed',
  id: '943',
  props: {
    title: 'Complex Image Title',
    sourceCaption: 'Complex Image Source',
    dataContent: '<p>Image Data</p>',
    dataLabel: 'Complex Image Additional data',
    src: '/sites/default/files/tide_demo_content/2018-19-State-Budget.jpg',
    downloadUrl:
      '/sites/default/files/tide_demo_content/2018-19-State-Budget.jpg',
    downloadLabel: 'Complex Image Download',
    type: 'image',
    variant: 'complex',
    allowFullscreen: true,
    fullscreenLabel: 'Complex Image Fullscreen',
    showTitle: true
  }
}

describe('complexImageMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    expect(complexImageMapping(rawData)).toEqual(result)
  })
})
