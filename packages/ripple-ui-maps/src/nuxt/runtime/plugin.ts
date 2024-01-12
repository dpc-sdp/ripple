import registerRplMapsPlugin from './../../plugins/register'
/* @ts-ignore */
import { defineNuxtPlugin } from '#imports'
/* @ts-ignore */
export default defineNuxtPlugin((nuxtApp) => {
  console.info('adding Vue 3 Openlayers')
  nuxtApp.vueApp.use({
    install: (app) => {
      registerRplMapsPlugin(app, {})
    }
  })
})
