import { fieldMappingUtils } from '@dpc-sdp/ripple-tide-api'

const { getField, getImageFromField, getLinkFromField, getBodyFromField } = fieldMappingUtils

export default {
  'paragraph--introduction_banner': (field) => ({
    component: 'rpl-intro-banner',
    class: 'rpl-site-constrain--on-all',
    props: {
      'title': getField(field, 'field_paragraph_title'),
      'introText': getField(field, ['field_paragraph_body', 'processed'], ''),
      'linkHeading': getField(field, 'field_call_to_action_title'),
      'links': getField(field, 'field_paragraph_links', []).map(l => getLinkFromField(l)),
      'showLinks': true,
      'linksType': () => {
        switch (field.field_banner_display_type) {
          case 'buttons':
            return 'button'
          case 'featured_links':
          default:
            return 'link'
        }
      },
      'icon': () => {
        switch (field.field_banner_type) {
          case 'with_icon':
            return 'alert_information'
          default:
            return null
        }
      }
    }
  }),
  'block_content--campaign': (field) => ({
    component: 'rpl-campaign-primary',
    props: {
      title: getField(field, 'field_block_title'),
      summary: getBodyFromField(field, 'body'),
      link: getLinkFromField(field, 'field_block_cta'),
      image: getImageFromField(field, 'field_block_image'),
      caption: () => {
        if (field.field_block_image && field.field_show_c_primary_caption) {
          return field.field_block_image.field_media_caption
        }
      }
    }
  })
}
