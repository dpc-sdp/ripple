import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

import RplCampaignSecondary from './index.vue'
import readme from './README.md'

storiesOf('Organisms/CampaignSecondary', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Campaign Secondary', withReadme(readme, () => ({
    components: { RplCampaignSecondary },
    template: `<rpl-campaign-secondary :title="title" :summary="summary" :link="link" :image="image" />`,
    data () {
      return {
        title: text('Title', 'Secondary campaign headline'),
        summary: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporar incident  incididunt ut labore et dolore magna aliqua. Ut enim ad minim niam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'),
        link: object('Call to action', { text: 'Call to action', url: '#' }),
        image: text('Image', 'http://placehold.it/699x411')
      }
    }
  })))
