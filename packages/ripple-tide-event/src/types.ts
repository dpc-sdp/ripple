import type { TidePageBase } from '@dpc-sdp/ripple-tide-api/types'

export type TideEventHeader = {
  title: string
  summary: string
}

export type TideEventLink = {
  text: string
  url: string
}

export type TideEventDate = {
  from: string
  to: string
}

export interface TideEventPage extends TidePageBase {
  /**
   * @description Example field - change this to your own!
   * @example 'Hello world from TideEventPage'
   */
  header: TideEventHeader
  overview: any
  details: string[]
  body: string
  link: TideEventLink
  date: TideEventDate
  showTime: boolean
}
