import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

import SIcons from '../../../storybook-components/Icons.vue'
import RplIcon from './index.vue'
import readme from './README.md'

storiesOf('Atoms/Icon', module)
  .add('Icon Library', withReadme(readme, () => ({
    components: { SIcons },
    template: '<s-icons :icons="icons" />',
    data () {
      return {
        icons: [
          'up',
          'right',
          'down',
          'hamburger',
          'search',
          'close'
        ]
      }
    }
  })))
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Icon', withReadme(readme, () => ({
    components: { RplIcon },
    template: '<rpl-icon :symbol="icon" :color="color" :size="size" />',
    data () {
      return {
        icon: text('Symbol', 'search'),
        color: text('Color', 'primary'),
        size: text('Size', 'm')
      }
    }
  })))
