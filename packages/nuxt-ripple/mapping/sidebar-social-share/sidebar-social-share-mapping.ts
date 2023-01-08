import type { TideApiResponse } from '@dpc-sdp/ripple-tide-api/types'

export const map = (src: TideApiResponse): string[] => {
  if (!src.field_show_social_sharing) {
    return []
  }

  return ['Facebook', 'Twitter', 'LinkedIn']
}

export const includes = []
