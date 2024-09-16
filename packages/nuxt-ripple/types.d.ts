import type { AxiosInstance } from 'axios'
import type {
  IRplFeatureFlags,
  IRplTideModuleMapping,
  TideSiteSection
} from '@dpc-sdp/ripple-tide-api/types'
import { TideAlert } from './src/mapping/alerts/site-alerts-mapping'
import { TideContact } from './src/mapping/sidebar-contacts/sidebar-contacts-mapping-types'
import { TideTopicTag } from './src/mapping/topic-tags/topic-tags-mapping'
import { HookResult } from '@nuxt/schema'

export type TideApiResponse = any

export interface TideSiteData {
  name: string
  shortName?: string
  slogan?: string
  _src?: any
  siteAlerts: TideAlert[]
  siteLogo: {
    href: string
    src: string
    altText: string
  }
  showQuickExit: boolean
  favicon?: {
    src: string
    width: string
    height: string
  }
  appIcon?: {
    src?: string
    apple?: string
    android?: string
  }
  acknowledgementHeader?: string
  acknowledgementFooter: string
  cornerGraphic?: {
    top?: TideImageField
    bottom?: TideImageField
  }
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

export interface TideAlert {
  alertId: string
  variant: 'information' | 'warning' | 'error'
  iconName: string
  message: string
  linkText: string
  linkUrl: string
}

export interface TideMenuItem {
  text: string
  url?: string
  id: string
  parent?: string | null
  weight?: number
  icon?: string
  iconColour?: string
  items?: TideMenuItem[]
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

export interface TideHeroHeader {
  title: string
  summary?: string
  links?: {
    title: string
    items: TideUrlField[]
    more: TideUrlField
  }
  theme?: 'default' | 'reverse' | 'neutral'
  logoImage?: TideImageField
  backgroundImage?: TideImageField
  backgroundImageCaption?: string
  cornerTop?: TideImageField
  cornerBottom?: TideImageField
  primaryAction?: TideUrlField
  secondaryAction?: TideUrlField
  secondaryActionLabel?: string
}

export interface TidePageBase {
  type: string
  title: string
  created: string
  changed: string
  nid: number
  background: string
  lang: string
  topicTags: TideTopicTag[]
  sidebar: {
    contacts?: TideContact[]
    relatedLinks?: any[]
    siteSectionNav?: {
      title: string
      items: any[]
    }
    socialShareNetworks?: []
    whatsNext?: []
  }
  siteSection: TideSiteSection
  [key: string]: unknown
}

export interface TideDynamicPageComponentBase {
  hasSidebar: boolean
  hasTitle: boolean
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
  config: {
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
    [key: string]: string | IRplTideModuleMapping
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

declare module 'nitropack' {
  export interface NitroApp {
    tide?: {
      pageApi: TidePageApi
      siteApi: TideSiteApi
    }
  }
}

declare module '#app' {
  interface RuntimeNuxtHooks {
    'tide:page': (props: {
      page: Partial<TidePageBase>
      site: Partial<TideSiteData>
    }) => HookResult
  }
}
