import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplCloseButton from './CloseButton.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Atoms/CloseButton', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Close Button', withReadme(readme, () => ({
    components: { RplCloseButton },
    template: `<rpl-close-button />`,
    data () {
      return demoData.closeButton()
    }
  })))
