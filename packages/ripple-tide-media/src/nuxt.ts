import { join } from 'pathe'
import { defineNuxtModule, addComponent, addComponentsDir } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
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
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      global: true
    })
  }
})
