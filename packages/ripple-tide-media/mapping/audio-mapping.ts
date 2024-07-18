import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'
import { tideMediaBaseMapping, tideMediaBaseIncludes } from './media-mapping'
import { getMediaPath } from '@dpc-sdp/ripple-tide-api'

const tideMediaAudioMapping: IRplTideModuleMapping = {
  mapping: {
    ...tideMediaBaseMapping,
    media: {
      ...tideMediaBaseMapping.media,
      url: (src: any) => getMediaPath(src.field_media_file)
    }
  },
  includes: [...tideMediaBaseIncludes, 'field_media_file']
}

export default tideMediaAudioMapping
