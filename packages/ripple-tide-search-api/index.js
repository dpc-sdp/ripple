import express from 'express'
import searchController from './controllers/search'
export const app = express()
const router = express.Router()

export default function appHandler (config) {
  router.route('/:template').get(searchController(config))
  const apiRoot = `/${config.apiBase || 'search-api'}/${config.apiVersion || 'v2'}`
  app.use(express.json())
  app.use(apiRoot, router)
  app.use(function (req, res, next) {
    const period = config.cacheAge || 300
    // you only want to cache for GET requests
    if (req.method === 'GET') {
      res.set('Cache-control', `public, max-age=${period}`)
    } else {
      // no caching parameters
      res.set('Cache-control', `no-store`)
    }
    next()
  })
  return app
}
