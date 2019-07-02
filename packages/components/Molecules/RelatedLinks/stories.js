import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplRelatedLinks from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Molecules/RelatedLinks', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Related Links', withReadme(readme, () => ({
    components: { RplRelatedLinks },
    template: `<rpl-related-links :title="title" :links="links" />`,
    data () {
      return demoData.relatedLinks()
    }
  })))
