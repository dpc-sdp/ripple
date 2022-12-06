import { join } from 'pathe'
import {
  defineNuxtModule,
  addServerHandler,
  addComponentsDir,
  createResolver
} from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    const { resolve } = createResolver(import.meta.url)

    // Add TidePublication components as dynamic imports in Nuxt apps - See https://v3.nuxtjs.org/guide/concepts/auto-imports
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      prefix: 'TidePublication',
      global: true
    })
    console.log('Added TidePublication UI components')

    addServerHandler({
      route: '/api/tide/publication-index',
      handler: resolve('../dist/publicationIndexHandler.js')
    })
    console.log('Added TidePublication Index API handler')
  }
})
