import { DefaultConfigOptions, createInput } from '@formkit/vue'
import { text, tel, date, checkbox, radio, submit } from './inputs'
import RplFormSelect from './components/select/select.vue'

const config: DefaultConfigOptions = {
  locale: 'en',
  config: {
    classes: {
      outer: 'rpl-u-margin-b-4'
    }
  },
  inputs: {
    text,
    tel,
    date,
    checkbox,
    radio,
    select: createInput(RplFormSelect),
    submit
  }
}

export default config
