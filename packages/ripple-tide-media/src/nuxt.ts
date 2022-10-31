import { join } from 'pathe'
import { defineNuxtModule, addComponent, addComponentsDir } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    addComponent({
      name: 'TideMediaEmbeddedVideoPage',
      filePath: '@dpc-sdp/ripple-tide-media/embedded-video',
      global: true
    })
    addComponent({
      name: 'TideMediaAudioPage',
      filePath: '@dpc-sdp/ripple-tide-media/audio',
      global: true
    })
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      global: true
    })
  }
})
