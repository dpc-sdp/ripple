import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplWifiMap from './WifiMap.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Organisms/WifiMap', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Wifi Map', withReadme(readme, () => ({
    components: { RplWifiMap },
    template: `<rpl-wifi-map />`,
    data () {
      return demoData.wifiMap()
    }
  })))
