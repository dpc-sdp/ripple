import get from 'lodash.get'
import { fieldMappingUtils as utils } from '@dpc-sdp/ripple-tide-api'

const { getField, getImageFromField, getLinkFromField, getBody, getBodyFromField } = utils
const cols = {
  m: 6,
  l: 4,
  xxxl: 3
}

export default {
  'paragraph--basic_text': (field) => {
    return {
      component: 'rpl-markup',
      props: {
        html: getBody(get(field, ['field_paragraph_body', 'processed'])),
        plugins: [],
        options: {}
      }
    }
  },
  'paragraph--accordion': (field) => {
    return {
      component: 'rpl-accordion',
      props: {
        title: getField(field, ['field_paragraph_title'], ''),
        accordions: getField(field, ['field_paragraph_accordion'], [])
          .map((content) => {
            if (content) {
              return {
                title: getField(
                  content,
                  ['field_paragraph_accordion_name'],
                  ''
                ),
                content: getBody(
                  get(content, ['field_paragraph_accordion_body', 'processed'])
                )
              }
            }
          }),
        type:
          field.field_paragraph_accordion_style === 'numbered' ? 'ol' : 'ul'
      }
    }
  },
  'paragraph--promotion_card': (field) => {
    return {
      component: 'rpl-card-promo',
      cols,
      props: {
        'title': getField(field, ['field_paragraph_title'], ''),
        'summary': getField(field, ['field_paragraph_summary'], ''),
        'image': getImageFromField(field, 'field_paragraph_media'),
        'link': getLinkFromField(field, 'field_paragraph_link'),
        'dateStart': getField(field, ['field_paragraph_link', 'internal_node_fields', 'date', 'value'], ''),
        'dateEnd': getField(field, ['field_paragraph_link', 'internal_node_fields', 'date', 'end_value'], ''),
        'topic': getField(field, ['field_paragraph_link', 'internal_node_fields', 'topic'], ''),
        'contentType': getField(field, ['field_paragraph_link', 'internal_node_fields', 'node_type'], ''),
        'fvRecommendationStatus': getField(field, ['field_paragraph_link', 'internal_node_fields', 'fv_recommendation_status'], ''),
        'inductionYear': getField(field, ['field_paragraph_link', 'internal_node_fields', 'induction_year']),
        'showMeta': getField(field, 'field_customise'),
        'displayStyle': getField(field, 'field_promo_card_display_style'),
        'isGrantOnGoing': getField(field, ['field_paragraph_link', 'internal_node_fields', 'ongoing'])
      }
    }
  },
  'paragraph--card_keydates': (field) => ({
    component: 'rpl-card-keydates',
    cols,
    props: {
      'title': getField(field, ['field_paragraph_title'], ''),
      'keydates': getField(field, ['field_paragraph_keydates'], []).map(item => {
        return {
          date: item.field_paragraph_keydate,
          title: item.field_paragraph_title,
          description: item.field_paragraph_summary
        }
      }),
      'link': getLinkFromField(field, ['field_paragraph_cta'], '')
    }
  }),
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
      summary: getBodyFromField(field, ['body', 'processed']),
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
