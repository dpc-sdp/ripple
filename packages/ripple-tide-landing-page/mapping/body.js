import get from 'lodash.get'
import { fieldMappingUtils as utils } from '@dpc-sdp/ripple-tide-api'

const { getField, getImageFromField, getLinkFromField, getBodyFromField } = utils
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
        html: getBodyFromField(field, 'field_paragraph_body'),
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
                content: getBodyFromField(content, 'field_paragraph_accordion_body')
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
        'title': getField(field, 'field_paragraph_title', ''),
        'summary': getField(field, 'field_paragraph_summary', ''),
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
      'title': getField(field, 'field_paragraph_title', ''),
      'keydates': getField(field, 'field_paragraph_keydates', []).map(item => {
        return {
          date: item.field_paragraph_keydate,
          title: item.field_paragraph_title,
          description: item.field_paragraph_summary
        }
      }),
      'link': getLinkFromField(field, 'field_paragraph_cta', '')
    }
  }),
  'paragraph--call_to_action': (field) => {
    const props = {
      'title': getField(field, 'field_paragraph_title', ''),
      'summary': getBodyFromField(field, 'field_paragraph_body', ''),
      'link': getLinkFromField(field, 'field_paragraph_cta', ''),
      'image': getImageFromField(field, 'field_paragraph_media', '')
    }
    if (field.field_paragraph_cta_style === 'banner') {
      return {
        component: 'rpl-call-to-action',
        cols,
        props,
        class: {
          wide: ['rpl-call-to-action--without-sidebar'],
          narrow: ['rpl-call-to-action--with-sidebar']
        }
      }
    } else if (field.field_paragraph_cta_style === 'card') {
      return {
        component: 'rpl-card-cta',
        cols,
        props
      }
    }
  },
  'paragraph--timelines': (field) => ({
    component: 'rpl-timeline',
    cols,
    props: {
      'title': getField(field, 'field_paragraph_title', ''),
      'list': getField(field, 'field_timeline', []).map(item => {
        return {
          image: getImageFromField(item, 'field_paragraph_media')?.src,
          title: getField(item, 'field_paragraph_title', ''),
          subtitle: getField(item, 'field_paragraph_cta_text', ''),
          url: getLinkFromField(item, 'field_paragraph_link', '')?.url,
          dateStart: getField(item, ['field_paragraph_date_range', 'value'], ''),
          dateEnd: getField(item, ['field_paragraph_date_range', 'end_value'], ''),
          description: getBodyFromField(item, ['field_paragraph_body'])
        }
      })
    }
  })
}
