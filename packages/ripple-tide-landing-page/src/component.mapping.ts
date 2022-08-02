import { getBody } from '@dpc-sdp/ripple-tide-api'

export default {
  'paragraph--basic_text': (field) => {
    return {
      component: 'RplContent',
      id: field.id,
      props: {
        html: getBody(field?.field_paragraph_body?.processed)
      }
    }
  }
}
