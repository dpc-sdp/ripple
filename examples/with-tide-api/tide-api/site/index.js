import { fieldMappingUtils as utils } from '@dpc-sdp/ripple-tide-api'
export default {
  mapping: {
    name: 'name',
    siteLogo: src => utils.getImageFromField(src, 'field_site_og_image')
  },
  includes: [
    'field_site_og_image',
    'field_site_og_image.field_media_image'
  ]
}
