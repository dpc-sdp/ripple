import { storiesOf } from '@storybook/vue'

import RplButton from '@dpc-sdp/ripple-button'

storiesOf('Atoms/Button', module)
  .add('Button', () => ({
    components: { RplButton },
    template: `<rpl-button :href="href" :theme="theme" :disabled="disabled">{{ content }}</rpl-button>`,
    data () {
      return {
        content: 'Ripple Button',
        href: false,
        theme: 'primary',
        disabled: false
      }
    }
  }))