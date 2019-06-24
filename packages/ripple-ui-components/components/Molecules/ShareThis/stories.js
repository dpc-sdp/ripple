import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplShareThis from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

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
      return demoData.shareThis()
    }
  })))
