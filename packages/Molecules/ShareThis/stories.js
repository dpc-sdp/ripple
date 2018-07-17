import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

import RplShareThis from './index.vue'
import readme from './README.md'

storiesOf('Molecules/ShareThis', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Share this', withReadme(readme, () => ({
    components: { RplShareThis },
    template: `<rpl-share-this
  :title="title"
  :url="url"
/>`,
    data () {
      return {
        title: text('Title', 'Share this'),
        url: text('Url', 'https://app-vic-gov-au-develop.lagoon.vicsdp.amazee.io/')
      }
    }
  })))
