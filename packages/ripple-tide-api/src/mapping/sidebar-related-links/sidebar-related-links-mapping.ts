import { TideApiResponse } from '../../../types'
import { TideLink } from './sidebar-related-links-mapping-types'

export const map = (src: TideApiResponse): TideLink[] => {
  if (!src.field_show_related_content) {
    return []
  }

  return (src.field_related_links || []).map((rawLink): TideLink => {
    return {
      id: rawLink.id,
      text: rawLink.field_paragraph_link.title,
      url: rawLink.field_paragraph_link.uri
        ? rawLink.field_paragraph_link.uri
        : rawLink.field_paragraph_link.url
    }
  })
}

export const includes = ['field_related_links']
