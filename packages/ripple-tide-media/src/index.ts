import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/ripple-tide-api'
import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'

const tideMediaBaseIncludes = tidePageBaseIncludes({
  withSidebarContacts: false,
  withSidebarRelatedLinks: false
})

const tideMediaBaseMapping = {
  ...tidePageBaseMapping({
    withSidebarContacts: false,
    withSidebarRelatedLinks: false
  }),
  type: () => 'media',
  title: 'name',
  modified: 'changed',
  header: {
    title: 'name',
    summary: 'field_media_summary'
  },
  media: {
    type: (data) => data.type && data.type.replace('media--', ''),
    summary: 'field_media_summary',
    content: 'field_media_transcript.processed'
  }
}

const tideMediaModule: RplTideMapping = {
  component: '@dpc-sdp/ripple-tide-media/component',
  schema: '@dpc-sdp/ripple-tide-media/types',
  mapping: {
    embedded_video: {
      ...tideMediaBaseMapping,
      media: {
        ...tideMediaBaseMapping.media,
        url: 'field_media_video_embed_field'
      }
    },
    audio: {
      ...tideMediaBaseMapping,
      media: {
        ...tideMediaBaseMapping.media,
        url: 'field_media_file.url'
      }
    }
  },
  includes: {
    embedded_video: [...tideMediaBaseIncludes],
    audio: [...tideMediaBaseIncludes, 'field_media_file']
  }
}

export default tideMediaModule
