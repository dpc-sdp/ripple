import type { IncomingMessage } from 'http'
import type { ModuleOptions } from './types/module'
import { createApp, App, useQuery, createError } from 'h3'
import { TidePageApi, TideSiteApi } from './index.js'

const errorHandler = (req) => {
  throw createError({
    statusMessage: req.statusMessage || 'Something went wrong!',
    statusCode: req.statusCode || 500,
    data: {
      requestUrl: new URL(req.url, `http://${req.headers.host}`).toString()
    }
  })
}

const tideHandler = async (options: ModuleOptions): Promise<App> => {
  const app = createApp()
  const tidePageApi = new TidePageApi(options)
  const tideSiteApi = new TideSiteApi(options)

  app.use('/page', async (req: IncomingMessage) => {
    const query = await useQuery(req)
    return tidePageApi.getPageByPath(`${query.path}`, { params: { site: 4 } })
  })
  app.use('/site', async (req: IncomingMessage) => {
    const query = await useQuery(req)
    return tideSiteApi.getSiteData(query.id)
  })
  // app.use(errorHandler)
  return app
}

export default tideHandler
