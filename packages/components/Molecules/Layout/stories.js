import { storiesOf } from '@storybook/vue'
import RplBaseLayout from './BaseLayout.vue'
import RplPageLayout from './PageLayout.vue'
import SSiteLayout from './../../../../src/storybook-components/SiteLayout.vue'

import {
  withKnobs,
  object,
  text,
  boolean
} from '@storybook/addon-knobs'

storiesOf('Molecules/Layout', module)
  .addDecorator(withKnobs)
  .add('Base Layout', () => ({
    components: { RplBaseLayout },
    template: `
      <rpl-base-layout>
        <template slot="header">{{ headerSlot }}</template>
        <p>{{ contentSlot }}</p>
        <template slot="footer">{{ footerSlot }}</template>
      </rpl-base-layout>
    `,
    props: {
      headerSlot: {
        default: text('Header slot', 'Site header')
      },
      contentSlot: {
        default: text('Content slot', 'This is page content')
      },
      footerSlot: {
        default: text('Footer slot', 'Site footer')
      }
    }
  }))
  .add('Page Layout', () => ({
    components: { RplPageLayout },
    template: `
      <rpl-page-layout>
        <template slot="aboveContent">{{ aboveContentSlot }}</template>
        <p>{{ contentSlot }}t</p>
        <template slot="belowContent">{{ belowContentSlot }}</template>
      </rpl-page-layout>
    `,
    props: {
      aboveContentSlot: {
        default: text('Above content slot', 'Above content')
      },
      contentSlot: {
        default: text('Content slot', 'This is page content')
      },
      belowContentSlot: {
        default: text('Below content slot', 'Below content')
      }
    }
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
    props: {
      sidebar: {
        default: boolean('Sidebar', true)
      },
      columns: {
        default: object('Columns', {
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
    props: {
      columns: {
        default: object('Columns', {
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
