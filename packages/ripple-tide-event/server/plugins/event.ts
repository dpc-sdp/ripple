import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import eventMapping from './../../mapping'
import type { NitroApp } from 'nitropack'

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  nitroApp.tide?.pageApi.setContentType('event', eventMapping)
})
