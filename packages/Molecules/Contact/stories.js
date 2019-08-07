import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplContact from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Molecules/Contact', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Contact', withReadme(readme, () => ({
    components: { RplContact },
    template: `<rpl-contact
  :title="title"
  :name="name"
  :department="department"
  :postal="postal"
  :address="address"
  :phone="phone"
  :email="email"
  :social="social"
/>`,
    data () {
      return demoData.contact()
    }
  })))
