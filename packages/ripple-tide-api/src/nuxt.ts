import { join } from 'pathe'
import type { RplTideModuleConfig } from './../types'
import {
  defineNuxtModule,
  addServerHandler,
  addComponent,
  addComponentsDir,
  addImportsDir,
  resolvePath,
  createResolver
} from '@nuxt/kit'
import { pascalCase } from 'change-case'

const loadComponents = async (key, path) => {
  const getComponentName = (name) => `Tide${pascalCase(name)}Page`
  if (Array.isArray(path)) {
    for (let i = 0; i < path.length; i++) {
      const filePath = await resolvePath(path[i])
      addComponent({ name: getComponentName(key), filePath, global: true })
    }
  }
  const filePath = await resolvePath(path)
  addComponent({ name: getComponentName(key), filePath, global: true })
}

export default defineNuxtModule({
  meta: {
    name: 'ripple-tide-api',
    configKey: 'tide'
  },
  async setup(options: RplTideModuleConfig, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    nuxt.options.runtimeConfig.public.tide = options

    // API endpoint handlers - See https://v3.nuxtjs.org/guide/directory-structure/server#api-routes
    addServerHandler({
      middleware: true,
      handler: resolve('./nuxt/handlers/tideMiddleware.js')
    })
    addServerHandler({
      route: '/api/tide/page',
      handler: resolve('./nuxt/handlers/pageHandler.js')
    })
    addServerHandler({
      route: '/api/tide/site',
      handler: resolve('./nuxt/handlers/siteHandler.js')
    })

    for (const key in options.mapping.content) {
      const modulePath = await resolvePath(
        `${options.mapping.content[`${key}`]}`
      )
      nuxt.options.runtimeConfig.public.tide.mapping.content[`${key}`] =
        modulePath
      const module = await import(modulePath)
      if (module && module.hasOwnProperty('component')) {
        await loadComponents(key, module.component)
      }
    }
    if (options.mapping.site) {
      nuxt.options.runtimeConfig.public.tide.mapping.site = await resolvePath(
        nuxt.options.runtimeConfig.public.tide.mapping.site
      )
    }
    // Add nuxt components and composables to imports
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './../src/nuxt/components'),
      prefix: 'tide',
      global: true
    })
    addImportsDir(join(__dirname, './../src/nuxt/composables'))
  }
})
