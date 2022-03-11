import type { IncomingMessage } from 'http'
import { createApp, App, useQuery } from 'h3'
import { TidePageApi, TideSiteApi } from './index.js'
import getSchema from './schema/index.js'
import type { RplTideModuleConfig } from './../types'

const tideHandler = async (config: RplTideModuleConfig): Promise<App> => {
  const app = createApp()
  const tideSiteApi = new TideSiteApi(config)
  const tidePageApi = new TidePageApi(config)
  new TidePageApi(config)

  app.use('/page', async (req: IncomingMessage) => {
    const query = await useQuery(req)
    if (!query.path || Array.isArray(query.path)) {
      throw new Error('No path supplied')
    }
    if (Array.isArray(query.site)) {
      throw new Error('Duplicate site values')
    }
    return tidePageApi.getPageByPath(query.path, query.site)
  })

  app.use('/site', async (req: IncomingMessage) => {
    const query = await useQuery(req)
    return tideSiteApi.getSiteData(query.id)
  })

  app.use('/schema', async () => {
    const schema = await getSchema(config)
    return schema
  })

  return app
}

export default tideHandler
