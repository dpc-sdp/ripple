import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'
import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplMarkup from './Markup.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Organisms/Markup', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Markup', withReadme(readme, () => ({
    components: { RplMarkup },
    template: `<rpl-markup :html="html" />`,
    data () {
      return demoData.markup()
    }
  })))
