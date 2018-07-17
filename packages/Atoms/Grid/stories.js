import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import RplContainer from './Container.vue'
import RplRow from './Row.vue'
import RplCol from './Col.vue'
import readme from './README.md'

import SGrids from './../../../src/storybook-components/Grids.vue'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Atoms/Layout', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Grid', withReadme(readme, () => ({
    components: { RplContainer, RplRow, RplCol },
    template: '<rpl-container><rpl-row><rpl-col :cols="cols" :colsBp="colsBp" :pull="pull" :push="push" style="border: 1px solid black">Column</rpl-col></rpl-row></rpl-container>',
    data () {
      return {
        cols: text('Cols default', 'full'),
        colsBp: object('Cols in breakpoints', {
          m: 6,
          l: 4,
          xxxl: 3
        }),
        push: object('Push', {
          m: 6
        }),
        pull: object('Pull', {})
      }
    }
  })))

storiesOf('Atoms/Layout', module)
  .add('Grid system', withReadme(readme, () => ({
    components: { SGrids },
    template: '<s-grids></s-grids>'
  })))
