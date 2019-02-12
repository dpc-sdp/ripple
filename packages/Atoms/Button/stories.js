import { storiesOf } from '@storybook/vue'
import { withDocs } from 'storybook-readme'
import VueInfoAddon, { withInfo } from 'storybook-addon-vue-info'
import { action } from '@storybook/addon-actions'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplButton from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Atoms/Button', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(readme))
  .add('Button', () => ({
    components: { RplButton },
    template: `<rpl-button :href="href" :theme="theme" :disabled="disabled">{{ content }}</rpl-button>`,
    data () {
      return demoData.button()
    }
  }))

storiesOf('Atoms/Button', module)
  .addDecorator(withKnobs)
  .add('Button with click action', withInfo({
    summary: 'We can use <code>@click.native.prevent</code> to add custom action. Check "Action logger" to see the click log.'
  })(() => ({
    components: { RplButton },
    template: `<rpl-button :href="href" :theme="theme" :disabled="disabled" @click.native.prevent="log">{{ content }}</rpl-button>`,
    data () {
      return demoData.button()
    },
    methods: {
      log: action('Button got clicked.')
    }
  })))
