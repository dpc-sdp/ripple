import { storiesOf } from '@storybook/vue'
import RplBreadcrumbs from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/Breadcrumbs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Breadcrumbs', () => ({
    components: { RplBreadcrumbs },
    template: `<rpl-breadcrumbs :crumbs="crumbs" />`,
    props: {
      crumbs: {
        default: () => object('Crumbs', [
          { text: 'Home', url: '#' },
          { text: 'Level 1 page title', url: '#' },
          { text: 'Level 2 page title' }
        ])
      }
    }
  }))
