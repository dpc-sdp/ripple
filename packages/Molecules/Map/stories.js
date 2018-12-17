import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {} from './ol'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplMap from './Map.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Molecules/Map', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Map', withReadme(readme, () => ({
    components: { RplMap },
    template: `<rpl-map basemapUrl="https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g" />`,
    data () {
      return demoData.map()
    }
  })))
