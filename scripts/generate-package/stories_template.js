import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import {{packageRippleName}} from './{{packageFileName}}.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('{{packageAtomFolder}}/{{packageSpacelessName}}', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('{{packageNaturalName}}', withReadme(readme, () => ({
    components: { {{packageRippleName}} },
    template: `<{{packageClassName}} />`,
    data () {
      return demoData.{{packageDemoDataName}}()
    }
  })))
