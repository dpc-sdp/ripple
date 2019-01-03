import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import RplContainer from './Container.vue'
import RplRow from './Row.vue'
import RplCol from './Col.vue'
import readme from './README.md'

import SGrids from './../../../src/storybook-components/Grids.vue'
import SGridTest from './../../../src/storybook-components/GridTest.vue'

import {
  withKnobs,
  boolean
} from '@storybook/addon-knobs/vue'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Atoms/Layout', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Grid', withReadme(readme, () => ({
    components: { RplContainer, RplRow, RplCol },
    template: '<rpl-container><rpl-row><rpl-col :cols="cols" :colsBp="colsBp" :pull="pull" :push="push" style="border: 1px solid black">Column</rpl-col></rpl-row></rpl-container>',
    data () {
      return demoData.grid()
    }
  })))

storiesOf('Atoms/Layout', module)
  .add('Grid system', withReadme(readme, () => ({
    components: { SGrids },
    template: '<s-grids></s-grids>'
  })))

storiesOf('Atoms/Layout', module)
  .addDecorator(withKnobs)
  .add('Grid tests', withReadme(readme, () => ({
    components: { SGridTest },
    template: '<s-grid-test :overflows="overflows"></s-grid-test>',
    data () {
      return {
        overflows: boolean('Show overflow', false)
      }
    }
  })))
