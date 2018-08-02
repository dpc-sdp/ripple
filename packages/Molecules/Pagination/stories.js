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
    template: `<rpl-pagination :steps="steps" :initialStep="initialStep" @change="change" />`,
    data () {
      return {
        steps: number('Steps', 5),
        initialStep: number('Initial Step', 1)
      }
    },
    methods: {
      change (newStep) {
        console.log('Going to step: ' + newStep)
      }
    }
  })))
