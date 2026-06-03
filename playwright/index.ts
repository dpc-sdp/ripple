// Import styles, initialize component theme here.
// import '../src/common.css';

import { beforeMount } from '@playwright/experimental-ct-vue/hooks'
import { h, type App, type VNode } from 'vue'
import {
  RplLink,
  RplImg,
  RplIcon,
  RplButton,
  RplContent,
  RplTextLink
} from '../packages/ripple-ui-core/src/components'
import MapWrapper from './MapWrapper.vue'
import Wrapper from './Wrapper.vue'
import '../packages/ripple-ui-core/src/styles'
import registerRplFormPlugin from '../packages/ripple-ui-forms/src/register'
import registerRplMapsPlugin from '../packages/ripple-ui-maps/src/plugins/register'

type ComponentWithRender = {
  render?: (this: unknown, ...args: unknown[]) => VNode
}

beforeMount(async ({ app }: { app: App }) => {
  // Add global components
  app.component('RplLink', RplLink)
  app.component('RplImg', RplImg)

  // Add global components needed for forms
  app.component('RplIcon', RplIcon)
  app.component('RplButton', RplButton)
  app.component('RplContent', RplContent)
  app.component('RplTextLink', RplTextLink)
  registerRplFormPlugin(app)

  // Maps setup
  app.component('MapWrapper', MapWrapper)
  registerRplMapsPlugin(app, {})

  const component = app._component as ComponentWithRender
  const render = component.render

  if (!render) return

  component.render = function (...args) {
    return h(Wrapper, null, {
      default: () => render.apply(this, args)
    })
  }
})
