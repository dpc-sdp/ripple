import { join } from 'pathe'
import {
  defineNuxtModule,
  addServerHandler,
  addComponentsDir,
  addComponent
} from '@nuxt/kit'

export default defineNuxtModule({
  async setup(_opt, nuxt) {
    // Add TidePublication component and mapping
    addComponent({
      name: 'TidePublicationPage',
      filePath: join(__dirname, './pages/publication.vue'),
      global: true
    })
    addComponent({
      name: 'TidePublicationPagePage',
      filePath: join(__dirname, './pages/publication-page.vue'),
      global: true
    })
    nuxt.options.runtimeConfig.public.tide.mapping.content.publication = join(
      __dirname,
      '../dist/mapping/publication.js'
    )
    nuxt.options.runtimeConfig.public.tide.mapping.content.publication_page =
      join(__dirname, '../dist/mapping/publication-page.js')

    // Add TidePublication page components as dynamic imports for Nuxt apps - See https://v3.nuxtjs.org/guide/concepts/auto-imports
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      prefix: 'TidePublication',
      global: true
    })
    console.log('Added TidePublication module')

    // Add API endpoint for TidePublication Index
    addServerHandler({
      route: '/api/tide/publication-index',
      handler: join(__dirname, '../dist/services/publicationIndexHandler.js')
    })
    console.log('Added TidePublicationIndex API endpoint')
  }
})
