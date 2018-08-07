import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplButton from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Atoms/Button', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Button', withReadme(readme, () => ({
    components: { RplButton },
    template: '<rpl-button :href="href" :theme="theme" :disabled="disabled">{{ content }}</rpl-button>',
    data () {
      return demoData.button()
    }
  })))
