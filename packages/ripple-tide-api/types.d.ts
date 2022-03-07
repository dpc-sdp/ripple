/* eslint-disable @typescript-eslint/ban-types */
export interface RplTideModuleMappingFunction {
  [key: string]: (src: object) => any | string | string[] | object
}

export interface RplTideMapping {
  component?: string | string[]
  schema?: string
  mapping: Record<string, (src: object) => any | string | string[] | object>
  includes: string[]
}

export interface TideUrlField {
  url: string
  text: string
}
export interface TideImageField {
  src: string
  alt: string
  focalPoint: {
    x: string
    y: string
  }
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
    auth: {
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
  debug: boolean
}
