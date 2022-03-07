/* eslint-disable @typescript-eslint/ban-ts-comment */
import { join } from 'pathe'
import type { RplTideModuleConfig } from './../types'
import {
  defineRplTideModule,
  RplTideModuleMapping
} from './utils/define-module'
import {
  defineNuxtModule,
  addServerMiddleware,
  addComponent,
  resolvePath
} from '@nuxt/kit'
import tideHandler from './server.js'

const loadComponents = async (key, path) => {
  if (Array.isArray(path)) {
    for (let i = 0; i < path.length; i++) {
      const filePath = await resolvePath(path[i])
      addComponent({ name: 'Tide' + key + 'Page', filePath, global: true })
    }
  }
  const filePath = await resolvePath(path)
  addComponent({ name: 'Tide' + key + 'Page', filePath, global: true })
}

export default defineNuxtModule({
  meta: {
    name: 'ripple-tide-api',
    configKey: 'tide'
  },
  async setup(options: RplTideModuleConfig) {
    const rplTideModule: RplTideModuleMapping = await defineRplTideModule(
      options
    )
    addServerMiddleware({
      path: '/api/tide',
      handler: await tideHandler({ ...options, mapping: rplTideModule })
    })
    for (const key in rplTideModule.content) {
      if (rplTideModule.content[`${key}`].component) {
        await loadComponents(key, rplTideModule.content[`${key}`].component)
      }
    }
  },
  hooks: {
    'autoImports:dirs'(dirs) {
      dirs.push(join(__dirname, './../src/nuxt/composables'))
    }
  }
})
