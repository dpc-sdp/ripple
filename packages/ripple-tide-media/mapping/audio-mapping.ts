import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'
import { tideMediaBaseMapping, tideMediaBaseIncludes } from './media-mapping'

const tideMediaAudioMapping: RplTideMapping = {
  mapping: {
    ...tideMediaBaseMapping,
    media: {
      ...tideMediaBaseMapping.media,
      url: 'field_media_file.url'
    }
  },
  includes: [...tideMediaBaseIncludes, 'field_media_file']
}

export default tideMediaAudioMapping
