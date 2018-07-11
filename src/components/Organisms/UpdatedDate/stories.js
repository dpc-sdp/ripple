import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

import RplUpdatedDate from './index.vue'
import readme from './README.md'

storiesOf('Organisms/UpdatedDate', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Updated Date', withReadme(readme, () => ({
    components: { RplUpdatedDate },
    template: `<rpl-updated-date :date="date" :prefix="prefix" :locale="locale" />`,
    data () {
      return {
        date: text('Date', '2018-07-10T09:00:00.000+10:00'),
        prefix: text('Prefix', 'Reviewed'),
        locale: text('Locale', 'en-au')
      }
    }
  })))
