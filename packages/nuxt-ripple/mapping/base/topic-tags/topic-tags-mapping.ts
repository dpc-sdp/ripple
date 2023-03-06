import { TideApiResponse } from '../../../types'

export interface TideTopicTag {
  text: string
  url: string
}

export const map = (src: TideApiResponse): TideTopicTag[] => {
  const topics: TideTopicTag[] = []

  if (src.field_topic) {
    topics.push({
      text: src.field_topic.name,
      url: src.field_topic.path?.alias || ''
    })
  }

  const tags = (src.field_tags || []).map((rawTag) => {
    return {
      text: rawTag.name,
      url: rawTag.path?.alias || ''
    }
  })

  return [...topics, ...tags]
}

export const includes = ['field_tags', 'field_topic']
