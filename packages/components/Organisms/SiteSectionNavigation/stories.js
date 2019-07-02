import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplSiteSectionNavigation from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Organisms/SiteSectionNavigation', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Site Section Navigation', withReadme(readme, () => ({
    components: { RplSiteSectionNavigation },
    template: `<rpl-site-section-navigation :menu="menu" :title="title" :activeLink="activeLink" />`,
    data () {
      return demoData.siteSectionNavigation()
    }
  })))
