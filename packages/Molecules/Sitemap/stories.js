import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplSitemap from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Molecules/Sitemap', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Sitemap', withReadme(readme, () => ({
    components: { RplSitemap },
    template: `<rpl-sitemap :menu="menu" />`,
    data () {
      return demoData.sitemap()
    }
  })))
