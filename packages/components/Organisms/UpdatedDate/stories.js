import { storiesOf } from '@storybook/vue'
import RplUpdatedDate from './index.vue'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs'

storiesOf('Organisms/UpdatedDate', module)
  .addDecorator(withKnobs)
  .add('Updated Date', () => ({
    components: { RplUpdatedDate },
    template: `<rpl-updated-date :date="date" :prefix="prefix" :locale="locale" />`,
    props: {
      date: {
        default: text('Date', '2018-07-10T09:00:00.000+10:00')
      },
      prefix: {
        default: text('Prefix', 'Reviewed')
      },
      locale: {
        default: text('Locale', 'en-au')
      }
    }
  }))
