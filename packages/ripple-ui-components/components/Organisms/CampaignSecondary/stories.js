import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplCampaignSecondary from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Organisms/CampaignSecondary', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Campaign secondary - Image', withReadme(readme, () => ({
    components: { RplCampaignSecondary },
    template: `<rpl-campaign-secondary :title="title" :summary="summary" :link="link" :image="image" :video="video" />`,
    data () {
      return demoData.campaignSecondaryImage()
    }
  })))
  .add('Campaign secondary - Video', withReadme(readme, () => ({
    components: { RplCampaignSecondary },
    template: `<rpl-campaign-secondary :title="title" :summary="summary" :link="link" :image="image" :video="video" />`,
    data () {
      return demoData.campaignSecondaryVideo()
    }
  })))
