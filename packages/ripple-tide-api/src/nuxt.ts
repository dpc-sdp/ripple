import { defineNuxtModule, addServerMiddleware } from '@nuxt/kit'
import type { IncomingMessage } from 'http'
import type { ModuleOptions } from './types/module'
import { createApp, App, useQuery } from 'h3'
import { TidePageApi, TideSiteApi } from './index.js'

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

  return app
}

export default defineNuxtModule({
  meta: {
    name: 'ripple-tide-api',
    configKey: 'tide'
  },
  async setup(options: ModuleOptions) {
    console.log('OPTIONS', options)
    addServerMiddleware({
      path: '/api/tide',
      handler: await tideHandler(options)
    })
  }
})
