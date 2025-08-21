import type {
  TideDocumentField,
  TideDynamicPageComponent,
  TidePageBase
} from '@dpc-sdp/ripple-tide-api/types'

export type TidePublicationHeader = {
  title: string
  summary: string
}

export type TidePublicationChapter = {
  title: string
  summary: string
  url: string
}

export type TidePublication = {
  text: string
  url: string
  id: string
  documents: TideDocumentField[]
}

export interface apiNode {
  title: string
  url: string
  id: string
  entity_id: string
  children: apiNode[] | undefined
}

export interface indexNode {
  text: string
  url: string
  id: string
  nid?: string
  items: indexNode[] | undefined
  active: boolean | undefined
}

export type flatIndexNode = Omit<indexNode, 'items'>

export interface TidePublicationMenu {
  publication: indexNode
}

export interface TidePublicationPage extends TidePageBase {
  /**
   * @description Page title
   */
  title: string
  url: string
  background: string
  showInPageNav: boolean
  inPageNavHeadingLevel: string
  /**
   * @description RplHeader
   */
  header: TidePublicationHeader
  /**
   * @description RplDescriptionList
   */
  details: any
  /**
   * @description List of cards
   */
  chapters: Array<TidePublicationChapter>
  /**
   * @description Landing page components
   */
  bodyComponents: TideDynamicPageComponent<any>[]
  publication: TidePublication
  breadcrumbs: Array<any>
}

export type TidePublicationPaginationLink = {
  url: string
  label: string
  description: string
}

export type TidePublicationPagination = {
  prev: TidePublicationPaginationLink
  next: TidePublicationPaginationLink
}

export interface TidePublicationPagePage extends TidePublicationPage {
  /**
   * @description Parent publication
   */
  publication: any
}
