import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'
import { tideMediaMapping, tideMediaIncludes } from '../media-mapping.js'

const tideMediaAudioMapping: RplTideMapping = {
  key: 'audio',
  schema: '@dpc-sdp/ripple-tide-media/types',
  mapping: {
    ...tideMediaMapping,
    media: {
      ...tideMediaMapping.media,
      url: 'field_media_file.url'
    }
  },
  includes: [...tideMediaIncludes, 'field_media_file']
}

export default tideMediaAudioMapping
