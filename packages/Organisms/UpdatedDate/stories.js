import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplUpdatedDate from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Organisms/UpdatedDate', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Updated Date', withReadme(readme, () => ({
    components: { RplUpdatedDate },
    template: `<rpl-updated-date :date="date" :prefix="prefix" :locale="locale" />`,
    data () {
      return demoData.updatedDate()
    }
  })))
