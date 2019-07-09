import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import {{packageRippleName}} from './{{packageFileName}}.vue'

storiesOf('{{packageAtomFolder}}/{{packageSpacelessName}}', module)
  .addDecorator(withKnobs)
  .add('{{packageNaturalName}}', withReadme(readme, () => ({
    components: { {{packageRippleName}} },
    template: `<{{packageClassName}} />`,
    props: {}
  })))
