import { storiesOf } from '@storybook/vue'

import SPage from './Page.vue'

import {
  withKnobs,
  boolean
} from '@storybook/addon-knobs/vue'

import { demoDataLocked } from './_data/demoData.js'

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Page demo', () => ({
    components: { SPage },
    template: `<s-page :sidebar="sidebar" :mock="mock"></s-page>`,
    data () {
      return {
        sidebar: boolean('Sidebar', true),
        mock: demoDataLocked
      }
    }
  }))
