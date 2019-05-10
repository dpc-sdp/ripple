import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplAccordion from './Accordion.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Organisms/Accordion', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Accordion', withReadme(readme, () => ({
    components: { RplAccordion },
    template: `<rpl-accordion :title="title" :type="type" :accordions="accordions" :single="single" />`,
    data () {
      return demoData.accordion()
    }
  })))
