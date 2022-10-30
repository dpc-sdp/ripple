import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/ripple-tide-api'
import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'

const tideMediaBaseMapping = {
  ...tidePageBaseMapping({
    withSidebarContacts: false,
    withSidebarRelatedLinks: false
  }),
  type: (data) => data.type,
  title: 'name',
  modified: 'changed',
  header: {
    title: 'name',
    summary: 'field_media_summary'
  },
  media: {
    summary: 'field_media_summary',
    content: 'field_media_transcript.processed'
  }
}

const tideMediaBaseIncludes = tidePageBaseIncludes({
  withSidebarContacts: false,
  withSidebarRelatedLinks: false
})

const tideMediaVideoModule: RplTideMapping = {
  component: '@dpc-sdp/ripple-tide-media/embedded-video',
  schema: '@dpc-sdp/ripple-tide-media/types',
  mapping: {
    ...tideMediaBaseMapping,
    media: {
      ...tideMediaBaseMapping.media,
      url: 'field_media_video_embed_field'
    }
  },
  includes: [...tideMediaBaseIncludes]
}

const tideMediaAudioModule: RplTideMapping = {
  component: '@dpc-sdp/ripple-tide-media/audio',
  schema: '@dpc-sdp/ripple-tide-media/types',
  mapping: {
    ...tideMediaBaseMapping,
    media: {
      ...tideMediaBaseMapping.media,
      url: 'field_media_file.url'
    }
  },
  includes: [...tideMediaBaseIncludes, 'field_media_file']
}

export default {
  embedded_video: tideMediaVideoModule,
  audio: tideMediaAudioModule
}
