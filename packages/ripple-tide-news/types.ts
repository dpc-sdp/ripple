import type { TidePageBase } from '@dpc-sdp/ripple-tide-api/types'
import {
  TideDynamicPageComponent,
  TideImageField
} from '@dpc-sdp/ripple-tide-api'

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
  showImage: boolean
  caption: string
  content: string
}

export interface TideNewsPage extends TidePageBase {
  showTopicTags: boolean
  header: TideNewsHeader
  details: TideNewsDetails
  body: TideNewsBody
  dynamicComponents: TideDynamicPageComponent<any>[]
}
