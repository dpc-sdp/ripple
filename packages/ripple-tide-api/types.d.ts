import type { NuxtProxyOptions as ModuleOptions } from 'nuxt-proxy'
import type { AxiosInstance } from 'axios'
import { TideAlert } from './src/mapping/alerts/site-alerts-mapping'
import { TideContact } from './src/mapping/sidebar-contacts/sidebar-contacts-mapping-types'
import { TideTopicTag } from './src/mapping/topic-tags/topic-tags-mapping'

export type TideApiResponse = any

export interface RplTideModuleMappingFunction {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: Function | string | string[] | object
}
export interface IRplTideModuleMapping {
  mapping: RplTideModuleMappingFunction
  includes: string[]
}

export interface TideSiteData {
  name: string
  _src?: any
  siteAlerts: TideAlert[]
  siteLogo: {
    href: string
    src: string
    altText: string
    printSrc: string
  }
  showQuickExit: boolean
  cornerGraphic?: {
    top?: TideImageField
    bottom?: TideImageField
  }
  contentRatingText?: string
  acknowledgementHeader?: string
  acknowledgementFooter: string
  copyrightHtml: string
  footerLogos: {
    alt: string
    url: string
    src: string
  }[]
  theme: {
    [key: string]: string
  }
  featureFlags: IRplFeatureFlags
  socialImages: {
    twitter: any
    og: any
  }
  socialLinks: TideMenuItem[]
  menus: {
    menuMain: TideMenuItem[]
    menuFooter: TideMenuItem[]
  }
}

export interface TideLink {
  id: string
  text: string
  url: string
}

export interface TideMenuItem {
  text: string
  url: string
  id: string
  parent: string | null
  weight: number
  items: TideMenuItem[]
}

export interface TideUrlField {
  url: string
  text: string
}
export interface TideImageField {
  src: string
  alt?: string
  title?: string
  width?: number
  height?: number
  focalPoint?: {
    x: string
    y: string
  }
}

export type TideDocumentField = {
  name: string
  url: string
  extension: string
  size: string
  id: string
}

export interface TidePageBase {
  title: string
  created: string
  changed: string
  nid: number
  background: string
  lang: string
  topicTags: TideTopicTag[]
  siteSection: TideSiteSection | null
  sidebar: {
    contacts?: TideContact[]
    relatedLinks?: any[]
  }
  showContentRating: boolean
}

export interface IRplTideDynamicComponentMapping {
  includes: string[]
  mapping: TideDynamicPageComponent
  contentTypes: string[]
}

export type TideDynamicPageComponent<T> = {
  id: string
  component: string
  title?: string
  props: T
  class?: Record<string, any>
  layout?: 'card' | string
  internalAnchors?: {
    id: string
    text: string
    type: 'h2' | 'h3'
  }[]
}

export type TideDynamicComponentGroup = {
  grouping: string
  components: TideDynamicPageComponent<any>[]
}

export type TidePropRange = {
  from: string | number
  to: string | number
}

export type TideSiteSectionOverrides = {
  showQuickExit: boolean
  featureFlags: IRplFeatureFlags
}

export type TideSiteSection = {
  id: string
  name: string
  siteOverrides: TideSiteSectionOverrides
}

export interface TideSocialShare {
  Facebook?: boolean
  LinkedIn?: boolean
  X?: boolean
  WhatsApp?: boolean
  email: boolean
  emailSubject: string
  emailBody: string
}

export interface RplTideModuleMappingConfig {
  /**
   * ContentType Mapping or path to file
   */
  content: {
    [key: string]: string | IRplTideModuleMapping
  }
}

export interface RplTideModuleConfig {
  /**
   * Site taxonomy id or name
   */
  site: string
  /**
   * URL of Tide Content Repository
   */
  baseUrl: string
  /**
   * Menu endpoint variant - default single
   */
  menuEndpoint?: 'single' | 'paginated' | 'linkset'
  mapping: {
    /**
     * ContentType Mapping or path to file
     */
    [key: string]: string | IRplTideMapping
  }
  /**
   * Enable debug mode
   */
  debug?: boolean
  /**
   * Pass http client (mostly used in testing)
   */
  client?: AxiosInstance
  /**
   * nuxt-proxy options
   */
  proxy?: ModuleOptions
  /**
   * Private config merged at runtime
   */
  config?: RplTideModuleInternalConfig
}

interface RplTideModuleInternalConfig {
  /**
   * Basic Auth credentials
   */
  auth?: {
    username: string
    password: string
  }
  /**
   * api prefix path - default /api/v1
   */
  apiPrefix: string
}

export type { ILogger } from './src/logger/logger.js'

export interface IRplFeatureFlags {
  /**
   * @description Sets the theme variant of the button component
   */
  buttonTheme?: 'neutral' | 'default'
  /**
   * @description Sets the theme variant of the header component
   */
  headerTheme?: 'neutral' | 'default'
  /**
   * @description Sets the theme variant of the site footer component
   */
  footerTheme?: 'neutral' | 'default'
  /**
   * @description Sets the display of the footer menu to one single level i.e. no children
   */
  footerMenuSingleLevel?: boolean
  /**
   * @description Disable the primary vic.gov.au logo for sites that are not co-branded
   */
  disablePrimaryLogo?: boolean
  /**
   * @description Disable the footer vic.gov.au logo for sites that are not co-branded
   */
  disableFooterLogo?: boolean
  /**
   * @description Sets which search connector to use for content collection queries
   */
  contentCollectionSearchConnector?: 'appSearch' | 'elasticsearch'
  /**
   * @description Option to disable the display of topics and tags on all content types
   */
  disableTopicTags?: boolean
  /**
   * @description Option to disable the display of the updated date on all content types
   */
  disableUpdatedDate?: boolean
  /**
   * @description Option to disable the display of the search form within the primary navigation
   */
  disablePrimaryNavSearch?: boolean
  /**
   * @description Force multi-line links to render on a single line in the primary navigation
   */
  primaryNavNowrap?: boolean
  /**
   * @description Option to override the default URL the search for redirects to
   */
  primaryNavSearchUrl?: string
  /**
   * @description Option to disable the display of coloured/rainbow stripes on top of promo cards
   */
  hidePromoCardStripe?: boolean
  /**
   * @description Sets the UAT Google Analytics measurement ID
   */
  uatMeasurementID?: string
  /**
   * @description Sets the PROD Google Analytics measurement ID
   */
  prodMeasurementID?: string
  /**
   * @description Sets a secondary GTM container ID
   */
  gtmContainerID?: string
  /**
   * @description Extends the default social share options
   */
  socialShare?: TideSocialShare
  /**
   * @description Sets the number of toggle-able levels
   */
  sectionNavToggleLevels?: number
  /**
   * @description Allow overriding the default site search content types
   */
  search?: {
    contentTypes: {
      [key: string]: boolean
    }
  }
  /**
   * @description Collapse inner links in breadcrumbs
   */
  breadcrumbsCollapseInnerLinks?: boolean
  /**
   * @description Custom flags
   */
  [key: string]: any
}

declare module 'nitropack' {
  export interface Nitro {
    tide?: {
      pageApi: string
    }
  }
}

// Mapping util interfaces
export function getAddress(address: any): string
export function getBody(body: any, customPlugins?: (() => void)[]): string
export function getBodyFromField(
  field: string,
  path: string | string[],
  fallback?: any
): string
export function getField(
  field: string,
  path: string | string[],
  fallback?: any
): any
export function getImageFromField(
  field: string,
  path: string | string[],
  fallback?: any
): string
export function getLinkFromField(field: any, path: string | string[]): any
export function humanizeFilesize(fileSize: number): string
export function getSiteKeyValues(key: string, src: any): any
export function getSiteSection(sectionId: string, src: any): any
export function getMediaPath(field: any, path?: string | string[]): string
export function getDocumentFromField(
  field: Record<string, any>,
  path: string
): TideDocumentField
export function getPlainText(content: string): string
export function getPlainTextFromField(
  field: string,
  path: string | string[],
  fallback?: any
): any
export function getBoolFromString(text: string): boolean | null
