import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import tideLandingPageModule from './../../mapping'
import dynamicComponents from './../../mapping/components'
import type { NitroApp } from 'nitropack'

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  nitroApp.tide?.pageApi.setContentType('landing_page', tideLandingPageModule)
  // Dynamic components
  Object.keys(dynamicComponents).forEach((key) => {
    nitroApp.tide?.pageApi.setDynamicComponent(key, dynamicComponents[key])
  })
})
