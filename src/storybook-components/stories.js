import { storiesOf } from '@storybook/vue'

import SPage from './Page.vue'
import SCampaignPage from './CampaignPage.vue'

import {
  withKnobs,
  boolean
} from '@storybook/addon-knobs/vue'

import { demoDataLocked } from './_data/demoData.js'

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Landing page demo', () => ({
    components: { SPage },
    template: `<s-page :sidebar="sidebar" :mock="mock"></s-page>`,
    data () {
      return {
        sidebar: boolean('Sidebar', true),
        mock: demoDataLocked
      }
    }
  }))

storiesOf('Templates', module)
  .add('Campaign page demo', () => ({
    components: { SCampaignPage },
    template: `<s-campaign-page :sidebar="sidebar" :mock="mock"></s-campaign-page>`,
    data () {
      return {
        sidebar: true,
        mock: demoDataLocked
      }
    }
  }))
