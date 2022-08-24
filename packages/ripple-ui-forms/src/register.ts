import { text, tel, date, checkbox, radio, submit } from './inputs'
import { plugin, defaultConfig, createInput } from '@formkit/vue'
import RplFormSelect from './components/select/select.vue'

export const defaultRplFormConfig = {
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

export default function registerRplFormPlugin(
  vueApp,
  config = defaultRplFormConfig
) {
  vueApp.use(plugin, defaultConfig(config))
}
