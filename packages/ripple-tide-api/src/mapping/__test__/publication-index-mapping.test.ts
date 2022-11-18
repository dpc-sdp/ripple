import { expect, describe, it, beforeAll } from '@jest/globals'
import * as jsonapiParse from 'jsonapi-parse'
import SAMPLE from './publication-index-mapping.sample.js'
import { processChildren } from '../publication-index.js'

const result = {
  text: 'Demo Publication',
  url: '/demo-publication',
  id: '11dede11-10c0-111e1-1100-000000000500',
  children: [
    {
      text: 'Demo Publication - Chapter 1',
      url: '/demo-publication/demo-publication-chapter-1',
      id: '11dede11-10c0-111e1-1100-000000000510',
      children: [
        {
          text: 'Demo Publication - Chapter 1 - Page 1',
          url: '/demo-publication/demo-publication-chapter-1/demo-publication-chapter-1-page-1',
          id: '11dede11-10c0-111e1-1100-000000000511'
        },
        {
          text: 'Demo Publication - Chapter 1 - Page 2',
          url: '/demo-publication/demo-publication-chapter-1/demo-publication-chapter-1-page-2',
          id: '11dede11-10c0-111e1-1100-000000000512'
        }
      ]
    },
    {
      text: 'Demo Publication - Chapter 2',
      url: '/demo-publication/demo-publication-chapter-2',
      id: '11dede11-10c0-111e1-1100-000000000520',
      children: [
        {
          text: 'Demo Publication - Chapter 2 - Page 1',
          url: '/demo-publication/demo-publication-chapter-2/demo-publication-chapter-2-page-1',
          id: '11dede11-10c0-111e1-1100-000000000521'
        },
        {
          text: 'Demo Publication - Chapter 2 - Page 2',
          url: '/demo-publication/demo-publication-chapter-2/demo-publication-chapter-2-page-2',
          id: '11dede11-10c0-111e1-1100-000000000522'
        },
        {
          text: 'Demo Publication - Chapter 2 - Page 3',
          url: '/demo-publication/demo-publication-chapter-2/demo-publication-chapter-2-page-3',
          id: '11dede11-10c0-111e1-1100-000000000523'
        }
      ]
    },
    {
      text: 'Demo Publication - Chapter 3',
      url: '/demo-publication/demo-publication-chapter-3',
      id: '11dede11-10c0-111e1-1100-000000000530'
    }
  ]
}

describe('PublicationIndex mapping', () => {
  let parsedData

  beforeAll(() => {
    parsedData = jsonapiParse.parse(SAMPLE)
  })

  it('maps a raw json api response children key to nested PublicationIndex structure', () => {
    expect(processChildren(parsedData)).toEqual(result)
  })
})
