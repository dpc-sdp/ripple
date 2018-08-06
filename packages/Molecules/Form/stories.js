import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import RplForm from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

// TODO: uncompleted, will do in theme task.
storiesOf('Molecules/Form', module)
  .addDecorator(VueInfoAddon)
  .add('Form', withReadme(readme, () => ({
    components: { RplForm },
    template: `<rpl-form :formData="formData"></rpl-form>`,
    data () {
      return demoData.form()
    }
  })))
