import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplAnchorLinks from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Molecules/AnchorLinks', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Anchor Links', withReadme(readme, () => ({
    components: { RplAnchorLinks },
    template: `<rpl-anchor-links :title="title" :links="links" />`,
    data () {
      return demoData.anchorLinks()
    }
  })))
