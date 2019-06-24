import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplFeaturedNews from './FeaturedNews.vue'
import RplNewsListing from './NewsListing.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Organisms/News', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Featured News', withReadme(readme, () => ({
    components: { RplFeaturedNews },
    template: `<rpl-featured-news :list="list" />`,
    data () {
      return demoData.featuredNews()
    }
  })))
  .add('News Listing', withReadme(readme, () => ({
    components: { RplNewsListing },
    template: `<rpl-news-listing :title="title" :list="list" />`,
    data () {
      return demoData.newsListing()
    }
  })))
