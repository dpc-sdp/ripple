import { storiesOf } from '@storybook/vue'
import RplPagination from './Pagination.vue'
import RplPrevNext from './PrevNext.vue'

import {
  withKnobs,
  number,
  text
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/Pagination', module)
  .addDecorator(withKnobs)
  .add('Pagination steps', () => ({
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
  .add('Previous next page', () => ({
    components: { RplPrevNext },
    template: `<rpl-prev-next :previousLink="previousLink" :previousText="previousText" :previousDescription="previousDescription" :nextLink="nextLink" :nextText="nextText" :nextDescription="nextDescription" />`,
    props: {
      previousLink: {
        default: text('Previous Link', '#')
      },
      previousText: {
        default: text('Previous Text', 'Previous')
      },
      previousDescription: {
        default: text('Previous Description', 'Previous page title can wrap over two lines')
      },
      nextLink: {
        default: text('Next Link', '#')
      },
      nextText: {
        default: text('Next Text', 'Next')
      },
      nextDescription: {
        default: text('Next Description', 'Next page title can wrap over two lines')
      }
    }
  }))
