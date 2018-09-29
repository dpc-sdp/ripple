import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import {{componentRippleName}} from './{{componentFileName}}.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('{{componentAtomFolder}}/{{componentSpacelessName}}', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('{{componentNaturalName}}', withReadme(readme, () => ({
    components: { {{componentRippleName}} },
    template: `<{{componentClassName}} />`,
    data () {
      return demoData.{{componentDemoDataName}}()
    }
  })))
