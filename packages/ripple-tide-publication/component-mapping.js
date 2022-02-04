import { fieldMappingUtils as utils } from '@dpc-sdp/ripple-tide-api'
const { getBodyFromField } = utils

export default {
  'paragraph--basic_text': (field) => {
    return {
      component: 'rpl-markup',
      props: {
        ...getBodyFromField(field, 'field_paragraph_body'),
        plugins: [],
        options: {}
      }
    }
  }
}
