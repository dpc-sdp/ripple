import express from 'express'
import searchController from './controllers/search'
import cacheAgeMiddleware from './middleware/cache-age'
export const app = express()
const router = express.Router()

export default function appHandler (config) {
  const apiRoot = `/${config.apiBase || 'search-api'}/${config.apiVersion || 'v2'}`
  app.use(express.json())
  app.use(cacheAgeMiddleware(config))
  router.route('/:template').get(searchController(config))
  app.use(apiRoot, router)
  return app
}
