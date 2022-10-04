import type { TidePageBase } from '@dpc-sdp/ripple-tide-api/types'

export type TideGrantHeader = {
  title: string
  summary: string
}

export type TideGrantOverview = {
  title: string
  funding: Record<string, any>
  audience: string
  date: Record<string, any>
  ongoing: boolean
  description: string
  link: Record<string, any>
}

export type TideGrantTimelineItem = {
  title: string
  subtitle: string
  url: string
  image: string
  dateStart: string
  dateEnd: string
  description: string
}

export type TideGrantTimeline = {
  title: string
  list: Array<TideGrantTimelineItem>
}

export type TideGrantGuidelineItem = {
  title: string
  content: string
  active: boolean
}

export type TideGrantGuidelines = {
  title: string
  id: string
  accordions: Array<TideGrantGuidelineItem>
}

export type TideGrantDocument = {
  name: string
  url: string
  extension: string
  filesize: string
  id: string
}

export default interface TideGrantPage extends TidePageBase {
  /**
   * @description Example field - change this to your own!
   * @example 'Hello world from TideGrantPage'
   */
  name: string
  header: any
  overview: TideGrantOverview
  timeline: TideGrantTimeline
  guidelines: TideGrantGuidelines
  documents: Array<TideGrantDocument>
  sidebarComponents: any
  background: string
}
