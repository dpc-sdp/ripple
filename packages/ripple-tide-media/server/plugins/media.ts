import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import tideMediaAudioModule from '../../mapping/audio-mapping'
import tideMediaEmbeddedVideoModule from '../../mapping/embedded-video-mapping'
import type { NitroApp } from 'nitropack'

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  nitroApp.tide?.pageApi.setContentType('audio', tideMediaAudioModule)
  nitroApp.tide?.pageApi.setContentType(
    'embedded_video',
    tideMediaEmbeddedVideoModule
  )
})
