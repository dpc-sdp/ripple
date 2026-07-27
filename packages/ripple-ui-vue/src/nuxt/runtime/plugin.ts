import { rplEventBus } from './../../lib/eventbus'
/* @ts-ignore */
import { defineNuxtPlugin } from '#imports'
/* @ts-ignore */
import icons from '#icons'

/* @ts-ignore */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use({
    install: (app) => {
      app.provide('rplIcons', icons)
      app.provide('$rplEvent', rplEventBus)
    }
  })
})
