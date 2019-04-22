import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplProfileHighlight from './ProfileHighlight.vue'
import RplProfileHighlightHonourRoll from './ProfileHighlightHonourRoll.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Organisms/Profile', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Profile Highlight', withReadme(readme, () => ({
    components: { RplProfileHighlight },
    template: `<rpl-profile-highlight :image="image">
  <template slot="details">
    <div v-html="content"></div>
  </template>
</rpl-profile-highlight>`,
    data () {
      return demoData.profileHightlight()
    }
  })))
  .add('Profile Highlight Honour Roll', withReadme(readme, () => ({
    components: { RplProfileHighlightHonourRoll },
    template: `<rpl-profile-highlight-honour-roll :image="image" :inductedYear="inductedYear" :category="category"/>`,
    data () {
      return demoData.profileHighlightHonourRoll()
    }
  })))
