import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplPagination from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Molecules/Pagination', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Pagination', withReadme(readme, () => ({
    components: { RplPagination },
    template: `<rpl-pagination :totalSteps="totalSteps" :initialStep="initialStep" :stepsAround="stepsAround" @change="change" />`,
    data () {
      return demoData.pagination()
    },
    methods: {
      change (newStep) {
        console.log('Going to step: ' + newStep)
      }
    }
  })))
