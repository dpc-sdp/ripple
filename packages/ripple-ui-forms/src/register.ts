import { plugin, defaultConfig } from '@formkit/vue'
import defaultRplFormConfig from './formkit.config'

export default function registerRplFormPlugin(
  vueApp,
  config = defaultRplFormConfig
) {
  vueApp.use(plugin, defaultConfig(config))
}
