import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import topicMapping from './../../mapping'
import type { NitroApp } from 'nitropack'

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  nitroApp.tide?.pageApi.setContentType('topic', topicMapping)
  nitroApp.tide?.pageApi.setContentType('tags', topicMapping)
})
