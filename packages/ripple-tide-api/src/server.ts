import { createApp, App, CompatibilityEvent } from 'h3'
import {
  TidePageApi,
  TideSiteApi,
  TidePublicationIndexApi,
  logger
} from './index.js'
import getSchema from './schema/index.js'
import type { RplTideModuleConfig } from './../types'
import { createSiteHandler } from './nuxt/handlers/siteHandler.js'
import { createPageHandler } from './nuxt/handlers/pageHandler.js'
import { createPublicationIndexHandler } from './nuxt/handlers/publicationIndexHandler.js'

const tideHandler = async (config: RplTideModuleConfig): Promise<App> => {
  const app = createApp()
  const tideSiteApi = new TideSiteApi(config, logger)
  const tidePageApi = new TidePageApi(config, logger)
  const tidePublicationIndexApi = new TidePublicationIndexApi(config, logger)

  app.use('/page', async (event: CompatibilityEvent) => {
    return createPageHandler(event, tidePageApi)
  })

  app.use('/site', async (event: CompatibilityEvent) => {
    return createSiteHandler(event, tideSiteApi)
  })

  app.use('/publication-index', async (event: CompatibilityEvent) => {
    return createPublicationIndexHandler(event, tidePublicationIndexApi)
  })

  app.use('/schema', async () => {
    const schema = await getSchema(config)
    return schema
  })

  return app
}

export default tideHandler
