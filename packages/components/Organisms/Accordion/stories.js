import { storiesOf } from '@storybook/vue'
import RplAccordion from './Accordion.vue'

import {
  withKnobs,
  text,
  select,
  object,
  boolean
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/Accordion', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    components: { RplAccordion },
    template: `<rpl-accordion :title="title" :type="type" :accordions="accordions" :single="single" />`,
    props: {
      title: {
        default: text('Title', 'Accordion Set')
      },
      type: {
        default: select('Type', ['numbered', 'default'], 'default')
      },
      accordions: {
        default: () => object('Accordion', [{
          title: 'Accordion Item',
          content: 'Lorem ipsum dolor sit amet, consectet adipiscing elit, seddo eiusmod tempore incididunt ut labore et dolore.'
        }, {
          title: 'Accordion Item',
          content: 'Lorem ipsum dolor sit amet, consectet adipiscing elit, seddo eiusmod tempore incididunt ut labore et dolore.'
        }])
      },
      single: {
        default: boolean('Single', false)
      }
    }
  }))
