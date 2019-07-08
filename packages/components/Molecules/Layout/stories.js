import { storiesOf } from '@storybook/vue'
import RplBaseLayout from './BaseLayout.vue'
import RplPageLayout from './PageLayout.vue'
import readme from './README.md'

import SSiteLayout from './../../../../src/storybook-components/SiteLayout.vue'

import {
  withKnobs,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/Layout', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Base Layout', () => ({
    components: { RplBaseLayout },
    template: `
      <rpl-base-layout>
        <template slot="header">Site header</template>
        <p>This is page content</p>
        <template slot="footer">Site footer</template>
      </rpl-base-layout>
    `
  }))
  .add('Page Layout', () => ({
    components: { RplPageLayout },
    template: `
      <rpl-page-layout>
        <template slot="aboveContent">Above content</template>
        <p>This is page content</p>
        <template slot="belowContent">Below content</template>
      </rpl-page-layout>
  `
  }))
  .add('Page Layout with Sidebar', () => ({
    components: { RplPageLayout },
    template: `
      <rpl-page-layout sidebar>
        <template slot="aboveContent">Above content</template>
        <p>This is page content</p>
        <template slot="sidebar">sidebar content</template>
        <template slot="belowContent">Below content</template>
      </rpl-page-layout>
    `,
    data () {
      return {
        columns: object('Columns', {
          main: { l: 8 },
          sidebar: {
            colsBp: { l: 3 },
            push: { l: 1 }
          }
        })
      }
    }
  }))
  .add('Page Layout with custom columns', () => ({
    components: { RplPageLayout },
    template: `
      <rpl-page-layout sidebar :columns="columns">
        <template slot="aboveContent">Above content</template>
        <p>This is page content</p>
        <template slot="sidebar">sidebar content</template>
        <template slot="belowContent">Below content</template>
      </rpl-page-layout>
    `,
    data () {
      return {
        columns: object('Columns', {
          main: { l: 8 },
          sidebar: {
            colsBp: { l: 3 },
            push: { l: 1 }
          }
        })
      }
    }
  }))

// Demo for site layout.
storiesOf('Molecules/Layout', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Site Layout', () => ({
    components: { SSiteLayout },
    template: '<s-site-layout :cardCols="cardCols" :cardColsWithSidebar="cardColsWithSidebar"></s-site-layout>',
    data () {
      return {
        cardCols: {
          m: 6,
          l: 4,
          xxxl: 3
        },
        cardColsWithSidebar: {
          m: 6,
          xxxl: 4
        }
      }
    }
  }))
  .add('Site Layout with Sidebar', () => ({
    components: { SSiteLayout },
    template: '<s-site-layout sidebar :cardCols="cardCols" :cardColsWithSidebar="cardColsWithSidebar"></s-site-layout>',
    data () {
      return {
        cardCols: {
          m: 6,
          l: 4,
          xxxl: 3
        },
        cardColsWithSidebar: {
          m: 6,
          xxxl: 4
        }
      }
    }
  }))
