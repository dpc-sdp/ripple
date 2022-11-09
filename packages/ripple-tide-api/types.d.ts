import type { AxiosInstance } from 'axios'
import { TideContact } from './src/mapping/sidebar-contacts/sidebar-contacts-mapping-types'

export type TideApiResponse = any

export interface RplTideModuleMappingFunction {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: function | string | string[] | object
}

export interface RplTideMapping {
  component?: string | string[]
  schema?: string
  key?: string
  mapping: RplTideModuleMappingFunction
  includes: string[]
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
  modified: string
  nid: number
  sidebar: {
    contacts?: TideContact[]
    relatedLinks?: TideLink[]
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
