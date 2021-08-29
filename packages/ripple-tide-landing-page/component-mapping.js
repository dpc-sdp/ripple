import get from 'lodash.get'
import { fieldMappingUtils as utils } from '@dpc-sdp/ripple-tide-api'

export default {
  'paragraph--basic_text': (field, page) => {
    return {
      component: 'rpl-markup',
      props: {
        html: utils.getBody(get(field, ['field_paragraph_body', 'processed'])),
        plugins: [],
        options: {}
      }
    }
  }
}
