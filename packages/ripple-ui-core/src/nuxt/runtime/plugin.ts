import { defineNuxtPlugin } from '#app'
import { rplEventBus } from './../../lib/eventbus'

/* @ts-ignore */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use({
    install: (app) => {
      app.provide('$rplEvent', rplEventBus)
    }
  })
})
