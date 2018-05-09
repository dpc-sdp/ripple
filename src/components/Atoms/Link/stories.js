import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

import RplLink from './index.vue'
import readme from './README.md'

storiesOf('Atoms/Link', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Link', withReadme(readme, () => ({
    components: { RplLink },
    template: '<rpl-link :href="href">Ripple Link</rpl-link>',
    data () {
      return {
        href: text('href', '#')
      }
    }
  })))
