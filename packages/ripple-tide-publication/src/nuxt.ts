import { join } from 'pathe'
import { defineNuxtModule, addComponentsDir, addServerHandler } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    // Add TidePublication components as dynamic imports in Nuxt apps - See https://v3.nuxtjs.org/guide/concepts/auto-imports
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      prefix: 'TidePublication',
      global: true
    })

    // addServerHandler({
    //   route: '/api/tide/publication/menu',
    //   handler: join('./handlers/publication-menu-handler.js')
    // })
  }
})
