import { TideApiResponse, TideLink } from '../../../types'
import { getLinkFromField } from '@dpc-sdp/ripple-tide-api'

export const map = (src: TideApiResponse): TideLink[] => {
  if (!src.field_show_whats_next) {
    return []
  }

  return (src.field_whats_next || []).map((rawLink): TideLink => {
    const link = getLinkFromField(rawLink, 'field_paragraph_link')

    return {
      id: rawLink.id,
      text: link?.text || '',
      url: link?.url || ''
    }
  })
}

export const includes = ['field_whats_next']
