import type {
  TidePageBase,
  TideDynamicPageComponent
} from '@dpc-sdp/ripple-tide-api'

export type TidePublicationPageHeader = {
  title: string
  summary: string
}

export type TidePublicationPagePaginationLink = {
  url: string
  label: string
  description: string
}

export type TidePublicationPagePagination = {
  prev: TidePublicationPagePaginationLink
  next: TidePublicationPagePaginationLink
}

export interface TidePublicationPagePage extends TidePageBase {
  /**
   * @description Page title
   */
  title: string
  url: string
  background: string
  breadcrumbs: any
  publication: any
  showInPageNav: boolean
  inPageNavHeadingLevel: string
  /**
   * @description RplHeader
   */
  header: TidePublicationPageHeader
  /**
   * @description Landing page components
   */
  dynamicComponents: TideDynamicPageComponent<any>[]
  /**
   * @description Previous / next pagination
   */
  // pagination: TidePublicationPagePagination
}
