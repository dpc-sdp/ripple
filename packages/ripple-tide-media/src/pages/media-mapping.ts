import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/ripple-tide-api'

export const tideMediaMapping = {
  ...tidePageBaseMapping({
    withSidebarContacts: false,
    withSidebarRelatedLinks: false
  }),
  type: (data) => data.type,
  title: 'name',
  modified: 'changed',
  header: {
    title: 'name'
  },
  media: {
    summary: 'field_media_summary',
    content: 'field_media_transcript.processed'
  }
}

export const tideMediaIncludes = tidePageBaseIncludes({
  withSidebarContacts: false,
  withSidebarRelatedLinks: false
})
