import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import collectionMapping from './../../mapping'
import type { NitroApp } from 'nitropack'

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  nitroApp.tide?.pageApi.setContentType(
    'tide_search_listing',
    collectionMapping
  )
})
