import { beforeMount } from '@playwright/experimental-ct-vue/hooks'
import { h, type App, type VNode } from 'vue'
import { RplLink, RplImg } from '../src/components'
import Wrapper from './Wrapper.vue'
import '../src/styles'

type ComponentWithRender = {
  render?: (this: unknown, ...args: unknown[]) => VNode
}

beforeMount(async ({ app }: { app: App }) => {
  app.component('RplLink', RplLink)
  app.component('RplImg', RplImg)

  const component = app._component as ComponentWithRender
  const render = component.render

  if (!render) return

  component.render = function (...args) {
    return h(Wrapper, null, {
      default: () => render.apply(this, args)
    })
  }
})
