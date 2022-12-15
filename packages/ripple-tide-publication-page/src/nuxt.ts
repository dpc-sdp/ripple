import { join } from 'pathe'
import { defineNuxtModule, addComponentsDir, addComponent } from '@nuxt/kit'

export default defineNuxtModule({
  async setup(_opt, nuxt) {
    // Add TidePublicationPage component and mapping
    addComponent({
      name: 'TidePublicationPagePage',
      filePath: join(__dirname, './index.vue'),
      global: true
    })
    nuxt.options.runtimeConfig.public.tide.mapping.content.publication_page =
      join(__dirname, '../dist/index.js')

    // Add TidePublicationPage page components as dynamic imports for Nuxt apps - See https://v3.nuxtjs.org/guide/concepts/auto-imports
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      prefix: 'TidePublicationPage',
      global: true
    })
    console.log('Added TidePublicationPage module')
  }
})
