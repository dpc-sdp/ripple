import { join } from 'pathe'
import { defineNuxtModule, addComponentsDir } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    // Add TidePublicationPage components as dynamic imports in Nuxt apps - See https://v3.nuxtjs.org/guide/concepts/auto-imports
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      prefix: 'TidePublicationPage',
      global: true
    })
    console.log('Added TidePublicationPage UI components')
  }
})
