
type BasicAuth = {
  username: string,
  password: string
}

type RippleTideApiModule = {
  [key: string]: boolean
}

type TideApiConfig = {
  apiPrefix: string,
  site: number,
  baseUrl: string,
  auth: BasicAuth
}

type Mapping = {
  includes: Array<string>,
  mapping: Record<string>
}

type RippleTideApiConfig = {
  apiBase: string,
  apiVersion: string,
  debug: boolean,
  modules: Array<Mapping>,
  tide: TideApiConfig,
  site: number,
  siteMapping: Mapping
  headers: Record<string>
}
