import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'
import { tideMediaMapping, tideMediaIncludes } from '../media-mapping.js'

const tideMediaEmbeddedVideoMapping: RplTideMapping = {
  key: 'embedded_video',
  schema: '@dpc-sdp/ripple-tide-media/types',
  mapping: {
    ...tideMediaMapping,
    media: {
      ...tideMediaMapping.media,
      url: 'field_media_video_embed_field'
    }
  },
  includes: tideMediaIncludes
}

export default tideMediaEmbeddedVideoMapping
