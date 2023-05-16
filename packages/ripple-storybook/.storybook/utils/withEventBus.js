import { provide } from 'vue'
import { rplEventBus } from '@dpc-sdp/ripple-ui-core'

export default function withEventBus(story, context) {
  return {
    components: { story },
    setup() {
      provide('$rplEvent', rplEventBus)
    },
    template: '<story />'
  }
}

export { rplEventBus }
