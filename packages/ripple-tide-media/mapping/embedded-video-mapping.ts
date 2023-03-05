import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'
import { tideMediaBaseMapping, tideMediaBaseIncludes } from './media-mapping'

const tideMediaEmbeddedVideoMapping: IRplTideModuleMapping = {
  mapping: {
    ...tideMediaBaseMapping,
    media: {
      ...tideMediaBaseMapping.media,
      url: 'field_media_video_embed_field'
    }
  },
  includes: tideMediaBaseIncludes
}

export default tideMediaEmbeddedVideoMapping
