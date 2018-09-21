import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplLatestEvents from './LatestEvents.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Organisms/Event', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Latest Events', withReadme(readme, () => ({
    components: { RplLatestEvents },
    template: `<rpl-latest-events :events="events" :cta="cta" :link="link" :title="title" />`,
    data () {
      return demoData.latestEvents()
    }
  })))
