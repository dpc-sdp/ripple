import { join } from 'pathe'
import { defineNuxtModule, addComponentsDir, addComponent } from '@nuxt/kit'

export default defineNuxtModule({
  async setup(_opt, nuxt) {
    // Add TideLandingPage component and mapping
    addComponent({
      name: 'TideLandingPagePage',
      filePath: join(__dirname, './index.vue'),
      global: true
    })
    nuxt.options.runtimeConfig.public.tide.mapping.content.landing_page = join(
      __dirname,
      '../dist/index.js'
    )

    // Add TideLandingPage page components as dynamic imports for Nuxt apps - See https://v3.nuxtjs.org/guide/concepts/auto-imports
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      prefix: 'TideLandingPage',
      global: true
    })
    console.log('Added TideLandingPage module')
  }
})
