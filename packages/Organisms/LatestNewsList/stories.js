import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplLatestNewsList from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Organisms/LatestNewsList', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Latest News List', withReadme(readme, () => ({
    components: { RplLatestNewsList },
    template: `<rpl-latest-news-list :list="list" />`,
    data () {
      return demoData.latestNewsList()
    }
  })))
