import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplAlert from './Alert.vue'
import RplAlertBase from './AlertBase.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Molecules/Alert', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Alert', withReadme(readme, () => ({
    components: { RplAlert },
    template: `<rpl-alert :title="'This is a placeholder component.'" @rplAlertClose="close" />`,
    data () {
      return {}
    },
    methods: {
      close () {
        alert('Alert close clicked.')
      }
    }
  })))
  .add('Alert Base', withReadme(readme, () => ({
    components: { RplAlertBase },
    template: `<rpl-alert-base :iconSymbol="iconSymbol" :backgroundColor="backgroundColor" :textColor="textColor" :iconColor="iconColor" :closeIconColor="closeIconColor" @rplAlertClose="close">
  <div v-html="content"></div>
</rpl-alert-base>`,
    data () {
      return demoData.alertBase()
    },
    methods: {
      close () {
        alert(`Alert base close clicked.`)
      }
    }
  })))
