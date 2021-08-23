import express from 'express'
import searchController from './controllers/search'
export const app = express()
const router = express.Router()

export default function appHandler (config) {
  const apiRoot = `/${config.apiBase || 'search-api'}/${config.apiVersion || 'v2'}`
  app.use(express.json())
  router.route('/:template').get(searchController(config))
  router.route('/dsl').post(searchController(config))
  app.use(apiRoot, router)
  return app
}
