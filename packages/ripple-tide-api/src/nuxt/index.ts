import {
  defineNuxtModule,
  addServerHandler,
  addServerPlugin,
  createResolver
} from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@dpc-sdp/ripple-tide-api',
    configKey: 'tide',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {},
  hooks: {},
  async setup() {
    const { resolve } = createResolver(import.meta.url)
    addServerPlugin(resolve('./runtime/server-plugin'))
    addServerHandler({
      route: '/api/tide/page',
      handler: resolve('./runtime/page-handler')
    })
    addServerHandler({
      route: '/api/tide/site',
      handler: resolve('./runtime/site-handler')
    })
  }
})
