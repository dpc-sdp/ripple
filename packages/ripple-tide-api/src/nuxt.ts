import { defineNuxtModule, addServerMiddleware } from '@nuxt/kit'
import type { IncomingMessage, ServerResponse } from 'http'
import type { ModuleOptions } from './types/module'
import getTideConfig from './utils/config-loader'
import { createApp, App, useQuery } from 'h3'
import { TidePageApi } from './index.js'

const tideHandler = async (options: ModuleOptions): Promise<App> => {
  const app = createApp()
  const site = options.site
  const tidePageApi = new TidePageApi(options)

  app.use('/page', async (req, res) => {
    const query = await useQuery(req)
    return tidePageApi.getPageByPath(`${query.path}`, { params: { site: 4 } })
  })
  app.use('/site', async (req: IncomingMessage, res: ServerResponse) => {
    return { site: `${site}` }
  })

  return app
}

export default defineNuxtModule({
  meta: {
    name: 'ripple-tide-api',
    configKey: 'tide'
  },
  async setup(options: ModuleOptions, nuxt) {
    console.log('OPTIONS', options)
    addServerMiddleware({
      path: '/api/tide',
      handler: await tideHandler(options)
    })
  }
})
