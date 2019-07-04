import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplBreadcrumbs from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Molecules/Breadcrumbs', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Breadcrumbs', withReadme(readme, () => ({
    components: { RplBreadcrumbs },
    template: `<rpl-breadcrumbs :crumbs="crumbs" />`,
    data () {
      return demoData.breadcrumbs()
    }
  })))
