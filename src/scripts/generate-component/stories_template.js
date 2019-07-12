import { storiesOf } from '@storybook/vue'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import {{componentRippleName}} from './{{componentFileName}}.vue'

storiesOf('{{componentAtomFolder}}/{{componentSpacelessName}}', module)
  .addDecorator(withKnobs)
  .add('{{componentNaturalName}}', () => ({
    components: { {{componentRippleName}} },
    template: `<{{componentClassName}} />`,
    props: {}
  }))
