import express, { Router } from 'express'
import env from 'dotenv'
import { TidePageController, TideSiteController } from './controllers'
// .env
env.config()

export default function createRippleTideApiServer (config) {
  const apiRoot = `/${config.apiBase || 'api'}/${config.apiVersion || 'v2'}`
  const router = Router()
  router.use('/page', TidePageController)
  router.use('/site/:id', TideSiteController)
  const app = express()
  app.use(apiRoot, router)
  app.locals.config = config

  return app
}
