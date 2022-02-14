export interface RippleTideModule {
  component: Function
  mapping: Object
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
  contentTypes: String[]
  siteMapping: String
}
