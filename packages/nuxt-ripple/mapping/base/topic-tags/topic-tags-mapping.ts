import { TideApiResponse } from '../../../types'

export interface TideTopicTag {
  text: string
  url: string
}

export const topicMap = (topic: any): TideTopicTag | null => {
  if (!topic?.name) return null

  return {
    text: topic.name,
    url: topic.path?.alias || ''
  }
}

export const tagMap = (tags: any): TideTopicTag[] => {
  return (tags || [])
    .map((rawTag: any) => {
      if (!rawTag?.name) return null

      return {
        text: rawTag.name,
        url: rawTag.path?.alias || ''
      }
    })
    .filter(Boolean)
}

export const map = (src: TideApiResponse): TideTopicTag[] => {
  const topic = topicMap(src?.field_topic)
  const tags = tagMap(src?.field_tags)

  return topic ? [topic, ...tags] : tags
}

export const includes = ['field_tags', 'field_topic']
