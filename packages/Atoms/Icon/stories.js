import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import SIcons from '../../../src/storybook-components/Icons.vue'
import RplIcon from './Icon.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Atoms/Icon', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Icon Library', withReadme(readme, () => ({
    components: { SIcons },
    template: '<s-icons :icons="icons" :color="color" :size="size" />',
    data () {
      return demoData.iconLibrary()
    }
  })))
  .add('Icon', withReadme(readme, () => ({
    components: { RplIcon },
    template: '<rpl-icon :symbol="icon" :color="color" :size="size" />',
    data () {
      return demoData.icon()
    }
  })))
