import { plugin, defaultConfig } from '@formkit/vue'

export default function registerRplFormPlugin(vueApp, config = defaultConfig) {
  vueApp.use(plugin, config)
}
