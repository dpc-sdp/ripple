/* eslint-disable @typescript-eslint/ban-ts-comment */
import { join } from 'pathe'
import type { ModuleOptions } from './types/module'
import {
  defineNuxtModule,
  addServerMiddleware,
  addComponent,
  resolvePath
} from '@nuxt/kit'
import tideHandler from './server.js'

export default defineNuxtModule({
  meta: {
    name: 'ripple-tide-api',
    configKey: 'tide'
  },
  async setup(options: ModuleOptions) {
    addServerMiddleware({
      path: '/api/tide',
      handler: await tideHandler(options)
    })
    for (const key in options.contentTypes) {
      const filePath = await resolvePath(
        options.contentTypes[`${key}`].pageComponent
      )
      addComponent({ name: 'Tide' + key + 'Page', filePath, global: true })
    }
  },
  hooks: {
    'autoImports:dirs'(dirs) {
      dirs.push(join(__dirname, './../src/nuxt/composables'))
    }
  }
})
