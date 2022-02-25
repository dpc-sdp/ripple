
import express from 'express'
import resourceByNameController from './controllers/resource'

export const app = express()
const router = express.Router()

export function ckanApi (config) {
  const apiRoot = `/${config.apiBase || 'ckan-api'}/${config.apiVersion || 'v1'}`
  router.get('/resource/:name', resourceByNameController(config))
  app.use(apiRoot, router)
  return app
}

export default function ckanApiModule (moduleOptions) {
  this.addServerMiddleware(ckanApi(moduleOptions))
}
