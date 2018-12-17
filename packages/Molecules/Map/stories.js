import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplMap from './Map.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Molecules/Map', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Map with no data', withReadme(readme, () => ({
    components: { RplMap },
    template: `<rpl-map
      :basemapUrl="basemapUrl" />`,
    data () {
      return demoData.mapData()
    }
  })))
  .add('Map with free wifi data', withReadme(readme, () => ({
    components: { RplMap },
    template: `<rpl-map
      :basemapUrl="basemapUrl"
      :themeLayerUrl="wifiLayerUrl"
      :center="wifiCenter"
      :zoom="wifiZoom" />`,
    data () {
      return demoData.mapData()
    }
  })))
