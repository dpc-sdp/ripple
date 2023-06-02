---
to: server/plugins/<%= h.changeCase.paramCase(name) %>.ts
---
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import <%= h.changeCase.pascalCase(name) %>Mapping from './../../mapping'
import type { NitroApp } from 'nitropack'

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  nitroApp.tide?.pageApi.setContentType('<%= h.changeCase.paramCase(name) %>', <%= h.changeCase.pascalCase(name) %>Mapping)
})
