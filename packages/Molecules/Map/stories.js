import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {} from './ol'
import {} from './ol-mapbox-style'

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
    template: `<rpl-map />`,
    data () {
      return demoData.map()
    }
  })))
