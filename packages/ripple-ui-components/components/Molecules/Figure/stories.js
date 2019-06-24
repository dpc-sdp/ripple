import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplFigure from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Molecules/Figure', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Figure', withReadme(readme, () => ({
    components: { RplFigure },
    template: `<rpl-figure :image="image" :caption="caption" />`,
    data () {
      return demoData.figure()
    }
  })))
