import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/ripple-tide-api'

export const tideMediaMapping = {
  ...tidePageBaseMapping(),
  type: (data) => data.type,
  title: 'name',
  header: {
    title: 'name'
  },
  media: {
    summary: 'field_media_summary',
    content: 'field_media_transcript.processed'
  }
}

export const tideMediaIncludes = tidePageBaseIncludes()
