import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplWysiwyg from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Molecules/Wysiwyg', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Wysiwyg', withReadme(readme, () => ({
    components: { RplWysiwyg },
    template: `<rpl-wysiwyg :html="html" />`,
    data () {
      return demoData.wysiwyg()
    }
  })))
