import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplCampaignPrimary from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Organisms/CampaignPrimary', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Campaign Primary', withReadme(readme, () => ({
    components: { RplCampaignPrimary },
    template: `<rpl-campaign-primary :title="title" :summary="summary" :link="link" :image="image" />`,
    data () {
      return demoData.campaignPrimary()
    }
  })))
