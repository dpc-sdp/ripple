import { storiesOf } from '@storybook/vue'
import RplPagination from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  number
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/Pagination', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Default', () => ({
    components: { RplPagination },
    template: `<rpl-pagination :totalSteps="totalSteps" :initialStep="initialStep" :stepsAround="stepsAround" @change="change" />`,
    props: {
      totalSteps: {
        default: number('Total steps', 8)
      },
      initialStep: {
        default: number('Initial step', 1)
      },
      stepsAround: {
        default: number('Step count around current', 2)
      }
    },
    methods: {
      change (newStep) {
        alert('Going to step: ' + newStep)
      }
    }
  }))
