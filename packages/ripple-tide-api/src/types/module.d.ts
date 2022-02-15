export interface RippleTideModule {
  component?: function
  mapping: object
  includes: array
}

export interface ModuleOptions {
  /**
   * Site taxonomy id or name
   */
  site: number | string
  baseUrl: string
  auth: {
    username: string
    password: string
  }
  contentTypes: string[]
  siteMapping: string
}
