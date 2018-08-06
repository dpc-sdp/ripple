import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplNewsListing from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Molecules/NewsListing', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('News Listing', withReadme(readme, () => ({
    components: { RplNewsListing },
    template: `<rpl-news-listing :title="title" :list="list" />`,
    data () {
      return demoData.newsListing()
    }
  })))
