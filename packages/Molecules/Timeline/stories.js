import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplTimeline from './Timeline.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Molecules/Timeline', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Timeline', withReadme(readme, () => ({
    components: { RplTimeline },
    template: `<rpl-timeline :title="title" :list="list" />`,
    data () {
      return demoData.timeline()
    }
  })))
