import { join } from 'pathe'
import { defineNuxtModule, addComponentsDir, addComponent } from '@nuxt/kit'

export default defineNuxtModule({
  async setup(_opt, nuxt) {
    // Add TideNews component and mapping
    addComponent({
      name: 'TideNewsPage',
      filePath: join(__dirname, './index.vue'),
      global: true
    })
    nuxt.options.runtimeConfig.public.tide.mapping.content.news = join(
      __dirname,
      '../dist/index.js'
    )

    // Add TideNews page components as dynamic imports for Nuxt apps - See https://v3.nuxtjs.org/guide/concepts/auto-imports
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      prefix: 'TideNews',
      global: true
    })
    console.log('Added TideNews module')
  }
})
