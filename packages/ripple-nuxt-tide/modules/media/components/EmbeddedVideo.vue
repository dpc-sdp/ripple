<template>
  <rpl-row row-gutter class="app-content tide-content tide-content--media tide-content--media-embedded-video">
    <rpl-col cols="full">
      <rpl-embedded-video variant="full" :src="page.field_media_video_embed_field" :transcript="page.field_media_transcript && page.field_media_transcript.processed" />
    </rpl-col>
  </rpl-row>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplEmbeddedVideo from '@dpc-sdp/ripple-embedded-video'

export default {
  components: {
    RplEmbeddedVideo,
    RplRow,
    RplCol
  },
  props: {
    page: Object
  }
}
</script>
