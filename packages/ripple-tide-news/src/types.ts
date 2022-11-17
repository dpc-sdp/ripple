import type { TidePageBase } from '@dpc-sdp/ripple-tide-api/types'
import { TideImageField } from '@dpc-sdp/ripple-tide-api'

export type TideNewsHeader = {
  title: string
  summary: string
}

export type TideNewsDetails = {
  published: string
  location: string
  department: string
}

export type TideNewsBody = {
  image: TideImageField
  caption: string
  content: string
}

export interface TideNewsPage extends TidePageBase {
  header: TideNewsHeader
  overview: TideNewsDetails
  body: TideNewsBody
}
