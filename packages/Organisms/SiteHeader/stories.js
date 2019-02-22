import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplSiteHeader from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Organisms/SiteHeader', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Site Header', withReadme(readme, () => ({
    components: { RplSiteHeader },
    template: `<rpl-site-header
  :logo="logo"
  :links="links"
  :breakpoint="breakpoint"
  :searchTerms="searchTerms"
  :sticky="sticky"
  :hideOnScroll="hideOnScroll"
  :showSearch="showSearch"
  :showLogout="showLogout"
  @logout="logoutFunc"
  @open="menuOpenFunc"
  @search="searchFunc"
/>`,
    data () {
      return demoData.header()
    },
    methods: {
      searchFunc: function (value) {
        alert('Search for: "' + value + '"')
      },
      logoutFunc: function () {
        alert('logout called')
      }
    }
  })))
