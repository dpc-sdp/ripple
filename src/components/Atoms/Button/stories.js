import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text,
  select,
  boolean
} from '@storybook/addon-knobs/vue'

import RplButton from './index.vue'
import readme from './README.md'

storiesOf('Atoms/Button', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Button', withReadme(readme, () => ({
    components: { RplButton },
    template: '<rpl-button :href="href" :theme="theme" :disabled="disabled">{{ content }}</rpl-button>',
    data () {
      return {
        content: text('Content', 'Ripple Button'),
        href: text('href', '#'),
        theme: select('Theme', {primary: 'primary', secondary: 'secondary'}, 'primary'),
        disabled: boolean('Disabled', false)
      }
    }
  })))
