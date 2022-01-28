import express, { Router } from 'express'
import env from 'dotenv'
import { TidePageController, TideSiteController, SchemaController } from './controllers/index.js'
// import * as OpenApiValidator from 'express-openapi-validator'
import swaggerUi from 'swagger-ui-express'
import schemaLoader from './schema/index.js'

// .env
env.config()

export default function createRippleTideApiServer (config) {
  const apiRoot = `/${config.apiBase || 'api'}/${config.apiVersion || 'v2'}`
  const router = Router()
  const schema = schemaLoader(config)

  router.use('/page', TidePageController)
  router.use('/site/:id', TideSiteController)
  router.use('/schema', SchemaController(schema))
  const app = express()
  app.use(apiRoot, router)
  app.use(`${apiRoot}/docs`, swaggerUi.serve, swaggerUi.setup(schema))
  app.locals.config = config
  return app
}
