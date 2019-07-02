import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplBaseLayout from './BaseLayout.vue'
import RplPageLayout from './PageLayout.vue'
import readme from './README.md'

import SSiteLayout from './../../../src/storybook-components/SiteLayout.vue'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Molecules/Layout', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Base Layout', withReadme(readme, () => ({
    components: { RplBaseLayout },
    template: `<rpl-base-layout>
  <template slot="header">Site header</template>
  <p>This is page content</p>
  <template slot="footer">Site footer</template>
</rpl-base-layout>`
  })))
  .add('Page Layout', withReadme(readme, () => ({
    components: { RplPageLayout },
    template: `<rpl-page-layout>
  <template slot="aboveContent">Above content</template>
  <p>This is page content</p>
  <template slot="belowContent">Below content</template>
</rpl-page-layout>`
  })))
  .add('Page Layout with Sidebar', withReadme(readme, () => ({
    components: { RplPageLayout },
    template: `<rpl-page-layout sidebar>
  <template slot="aboveContent">Above content</template>
  <p>This is page content</p>
  <template slot="sidebar">sidebar content</template>
  <template slot="belowContent">Below content</template>
</rpl-page-layout>`
  })))
  .add('Page Layout with custom columns', withReadme(readme, () => ({
    components: { RplPageLayout },
    template: `<rpl-page-layout sidebar :columns="columns">
  <template slot="aboveContent">Above content</template>
  <p>This is page content</p>
  <template slot="sidebar">sidebar content</template>
  <template slot="belowContent">Below content</template>
</rpl-page-layout>`,
    data () {
      return demoData.pageLayout()
    }
  })))

// Demo for site layout.
storiesOf('Molecules/Layout', module)
  .add('Site Layout', withReadme(readme, () => ({
    components: { SSiteLayout },
    template: '<s-site-layout :cardCols="cardCols" :cardColsWithSidebar="cardColsWithSidebar"></s-site-layout>',
    data () {
      return demoData.siteLayout()
    }
  })))
  .add('Site Layout with Sidebar', withReadme(readme, () => ({
    components: { SSiteLayout },
    template: '<s-site-layout sidebar :cardCols="cardCols" :cardColsWithSidebar="cardColsWithSidebar"></s-site-layout>',
    data () {
      return demoData.siteLayout()
    }
  })))
