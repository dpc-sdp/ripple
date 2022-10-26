import type { TidePageBase } from '@dpc-sdp/ripple-tide-api/types'

export type TideMediaHeader = {
  title: string
  summary?: string
}

export type TideMediaMedia = {
  type: 'embedded_video' | 'audio'
  url: string
  content: string
}

export default interface TideMediaPage extends TidePageBase {
  header: TideMediaHeader
  media: TideMediaMedia
}
