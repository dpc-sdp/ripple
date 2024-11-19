import { expect, describe, it, beforeAll } from '@jest/globals'
import * as jsonapiParse from 'jsonapi-parse'
import { rawData } from './rawdata'
import {
  map as topicTagMapping,
  tagMap as tagMapping,
  topicMap as topicMapping
} from '../topic-tags-mapping'

const topicResult = { text: 'Demo Topic', url: '/topic/demo-topic' }

const tagsResult = [
  { text: 'Demo Tag', url: '/tags/demo-tag' },
  { text: 'Another Demo Tag', url: '/tags/another-demo-tag' }
]

describe('sidebarWhatsNextMapping', () => {
  let parsedData

  beforeAll(() => {
    parsedData = jsonapiParse.parse(rawData).data
  })

  it('maps a raw json api response to a single topic', () => {
    expect(topicMapping(parsedData.field_topic)).toEqual(topicResult)
  })

  it('maps a raw json api response to an array of tags', () => {
    expect(tagMapping(parsedData.field_tags)).toEqual(tagsResult)
  })

  it('maps a raw json api response to an array of topic and tags', () => {
    expect(topicTagMapping(parsedData)).toEqual([topicResult, ...tagsResult])
  })
})
