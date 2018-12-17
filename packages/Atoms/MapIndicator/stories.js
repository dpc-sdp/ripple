import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplMapIndicator from './MapIndicator.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Atoms/MapIndicator', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Map Indicator', withReadme(readme, () => ({
    components: { RplMapIndicator },
    template: `<rpl-map-indicator />`,
    data () {
      return demoData.mapIndicator()
    }
  })))
