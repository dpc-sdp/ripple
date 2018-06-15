import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  object
} from '@storybook/addon-knobs/vue'

import RplBreadcrumbs from './index.vue'
import readme from './README.md'

storiesOf('Molecules/Breadcrumbs', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Breadcrumbs', withReadme(readme, () => ({
    components: { RplBreadcrumbs },
    template: `<rpl-breadcrumbs :crumbs="crumbs" />`,
    data () {
      return {
        crumbs: object('Crumbs', [
          { text: 'Home', url: '#' },
          { text: 'Level 1', url: '#' },
          { text: 'Level 2 page title' }
        ])
      }
    }
  })))
