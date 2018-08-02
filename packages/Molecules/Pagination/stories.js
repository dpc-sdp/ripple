import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  number
} from '@storybook/addon-knobs/vue'

import RplPagination from './index.vue'
import readme from './README.md'

storiesOf('Molecules/Pagination', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Pagination', withReadme(readme, () => ({
    components: { RplPagination },
    template: `<rpl-pagination :totalSteps="totalSteps" :initialStep="initialStep" :stepsAround="stepsAround" @change="change" />`,
    data () {
      return {
        totalSteps: number('Total steps', 8),
        initialStep: number('Initial step', 1),
        stepsAround: number('Step count around current', 2)
      }
    },
    methods: {
      change (newStep) {
        console.log('Going to step: ' + newStep)
      }
    }
  })))
