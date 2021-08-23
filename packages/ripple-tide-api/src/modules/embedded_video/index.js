export default {
  mapping: {
    title: 'name',
    nid: 'drupal_internal__mid',
    type: data => data.type.replace('media--', ''),
    video: data => ({ src: data.field_media_video_embed_field }),
    transcript: 'field_media_transcript.processed'
  },
  includes: []
}
