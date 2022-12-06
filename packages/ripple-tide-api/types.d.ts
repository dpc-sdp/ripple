import type { AxiosInstance } from 'axios'
import { TideAlert } from './src/mapping/alerts/site-alerts-mapping'
import { TideContact } from './src/mapping/sidebar-contacts/sidebar-contacts-mapping-types'
import { TideTopicTag } from './src/mapping/topic-tags/topic-tags-mapping'

export type TideApiResponse = any

export interface RplTideModuleMappingFunction {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: Function | string | string[] | object
}
export interface RplTideMapping {
  component?: string | string[]
  schema?: string
  key?: string
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
  }
  showQuickExit: boolean
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
  socialImages: {
    twitter: any
    og: any
  }
  menus: {
    menuMain: TideMenuItem[]
    menuFooter: TideMenuItem[]
  }
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

export interface TidePageBase {
  title: string
  description: string
  created: string
  changed: string
  nid: number
  background: string
  lang: string
  topicTags: TideTopicTag[]
  sidebar: {
    contacts?: TideContact[]
    relatedLinks?: any[]
  }
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

export interface RplTideModuleConfig {
  contentApi: {
    /**
     * Site taxonomy id or name
     */
    site: string
    /**
     * URL of Tide Content Repository
     */
    baseUrl: string
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
  mapping: {
    /**
     * ContentType Mapping or path to file
     */
    content: {
      [key: string]: string | RplTideMapping
    }
    /**
     * Site Mapping or path to file
     */
    site: string | RplTideMapping
  }
  /**
   * Enable debug mode
   */
  debug?: boolean
  /**
   * Pass http client (mostly used in testing)
   */
  client?: AxiosInstance
}

export type { ILogger } from './src/logger/logger.js'
