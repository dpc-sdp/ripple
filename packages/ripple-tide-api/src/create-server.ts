import express, { Application, Router } from 'express'
import env from 'dotenv'
import { TidePageController, TideSiteController } from './controllers'
//.env
env.config()

//express

const PORT = process.env.PORT || 3001
const SERVER_URL = process.env.SERVER_URL || 'http://localhost'

export type BasicAuth = {
  username: string,
  password: string
}

export type TideApiConfig = {
  apiPrefix: string,
  site: number,
  baseUrl: string,
  auth: BasicAuth
}

export interface RippleTideApiModule extends Record<string,any> {
  [key: string]: Function|string|Array<string>
}

export type Mapping = {
  includes: Array<string>,
  mapping: RippleTideApiModule
}

export interface RippleTideApiConfig extends Record<string,any>   {
  apiBase: string,
  apiVersion: string,
  debug: boolean,
  tide: TideApiConfig
}

export default function createRippleTideApiServer (config: RippleTideApiConfig) {
  const apiRoot = `/${config.apiBase || 'api'}/${config.apiVersion || 'v2'}`
  const router: Router = Router()
  router.use('/page', TidePageController)
  router.use('/site/:id', TideSiteController)
  
  const app: Application = express()
  app.use(apiRoot, router)
  console.log(config)
  app.locals.config = config

  return app
}
