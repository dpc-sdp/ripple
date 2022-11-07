import registerRplCorePlugins from './index'

// eslint-disable-next-line no-undef
export default defineNuxtPlugin((nuxtApp) => {
  registerRplCorePlugins(nuxtApp.vueApp)
})
