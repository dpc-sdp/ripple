import { TideApiResponse } from '../../../types'

export interface TideTopicTag {
  text: string
  url: string
}

export const map = (src: TideApiResponse): TideTopicTag[] => {
  const topics: TideTopicTag[] = []

  if (src.field_topic?.name) {
    topics.push({
      text: src.field_topic.name,
      url: src.field_topic.path?.alias || ''
    })
  }

  const tags = (src.field_tags || [])
    .map((rawTag: any) => {
      if (!rawTag?.name) return null

      return {
        text: rawTag.name,
        url: rawTag.path?.alias || ''
      }
    })
    .filter(Boolean)

  return [...topics, ...tags]
}

export const includes = ['field_tags', 'field_topic']
