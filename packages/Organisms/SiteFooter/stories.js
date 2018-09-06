import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplSiteFooter from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Organisms/SiteFooter', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Site footer', withReadme(readme, () => ({
    components: { RplSiteFooter },
    template: `<rpl-site-footer
:nav="nav"
:links="links"
:copyright="copyright"
:acknowledgement="acknowledgement"
/>`,
    data () {
      return demoData.footer()
    }
  })))
