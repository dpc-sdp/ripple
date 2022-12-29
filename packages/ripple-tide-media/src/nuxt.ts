import { join } from 'pathe'
import { defineNuxtModule, addComponentsDir, addComponent } from '@nuxt/kit'

export default defineNuxtModule({
  async setup(_opt, nuxt) {
    // Add TideMedia components and mapping
    addComponent({
      name: 'TideMediaEmbeddedVideoPage',
      filePath: join(
        __dirname,
        './pages/embedded-video/tide-media-embedded-video.vue'
      ),
      global: true
    })
    addComponent({
      name: 'TideMediaAudioPage',
      filePath: join(__dirname, './pages/audio/tide-media-audio.vue'),
      global: true
    })
    nuxt.options.runtimeConfig.public.tide.mapping.content.media = join(
      __dirname,
      '../dist/index.js'
    )
    console.log('Added TideMedia module')

    // Add TideMedia page components as dynamic imports for Nuxt apps - See https://v3.nuxtjs.org/guide/concepts/auto-imports
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      prefix: 'TideMedia',
      global: true
    })
    console.log('Added TideMedia UI components')
  }
})
