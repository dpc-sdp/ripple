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
  id: string
  title: string
  content: string
  active: boolean
}

export type TideGrantGuidelines = {
  id: string
  title: string
  accordions: Array<TideGrantGuidelineItem>
}

export type TideGrantDocument = {
  name: string
  url: string
  extension: string
  filesize: string
  id: string
}

export interface TideGrantPage extends TidePageBase {
  name: string
  /**
   * @description Props for component wrapper
   */
  header: TideGrantHeader
  /**
   * @description Props for component wrapper
   */
  overview: TideGrantOverview
  /**
   * @description Props for component wrapper
   */
  timeline: TideGrantTimeline
  /**
   * @description Props for component wrapper
   */
  guidelines: TideGrantGuidelines
  /**
   * @description Props for component wrapper
   */
  documents: Array<TideGrantDocument>
  sidebarComponents: any
  background: string
}
