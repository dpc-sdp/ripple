import { defineEventHandler } from 'h3'
import { registerTideContentType } from '@dpc-sdp/ripple-tide-api'
import tideMediaAudioModule from '../../mapping/audio-mapping'
import tideMediaEmbeddedVideoModule from '../../mapping/embedded-video-mapping'

export default defineEventHandler(async (event) => {
  // Adds media audio mapping
  registerTideContentType(event, 'audio', tideMediaAudioModule)
  // Adds media embedded video mapping
  registerTideContentType(event, 'embedded_video', tideMediaEmbeddedVideoModule)
})
