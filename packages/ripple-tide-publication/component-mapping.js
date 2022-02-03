import get from 'lodash.get'
import { fieldMappingUtils as utils } from '@dpc-sdp/ripple-tide-api'
const { getBody } = utils

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
  }
}
