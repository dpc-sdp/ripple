import express from 'express'
// import swaggerUi from 'swagger-ui-express'
// import schemaLoader from './schema'
import searchController from './controllers/search'
export const app = express()
const router = express.Router()

export default function appHandler (config) {
  router.get('/search/:template', searchController(config))
  const apiRoot = `/${config.apiBase || 'api'}/${config.apiVersion || 'v2'}`
  app.use(apiRoot, router)
  // app.use(`${apiRoot}/docs`, swaggerUi.serve, swaggerUi.setup(schemaLoader(config)))
  return app
}
