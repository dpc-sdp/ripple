import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplWhatsNext from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Molecules/WhatsNext', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('What\'s Next', withReadme(readme, () => ({
    components: { RplWhatsNext },
    template: `<rpl-whats-next :title="title" :links="links" />`,
    data () {
      return demoData.whatsNext()
    }
  })))
