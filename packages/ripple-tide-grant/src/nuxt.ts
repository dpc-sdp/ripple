import { join } from 'pathe'
import { defineNuxtModule, addComponentsDir } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    // Add TideGrant components as dynamic imports in Nuxt apps - See https://v3.nuxtjs.org/guide/concepts/auto-imports
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      prefix: 'TideGrant',
      global: true
    })
    console.log('Added TideGrant UI components')
  }
})
