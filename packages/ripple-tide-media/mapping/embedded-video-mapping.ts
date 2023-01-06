import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'
import { tideMediaBaseMapping, tideMediaBaseIncludes } from './media-mapping'

const tideMediaEmbeddedVideoMapping: RplTideMapping = {
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
