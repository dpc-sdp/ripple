---
to: server/middleware/tide-<%= h.changeCase.camelCase(name) %>.ts
---
import { defineEventHandler } from 'h3'
import { registerTideContentType } from '@dpc-sdp/ripple-tide-api'
import tide<%= h.changeCase.camelCase(name) %>Module from '../../mapping'

export default defineEventHandler(async (event) => {
  // Adds tide<%= h.changeCase.camelCase(name) %> mapping
  registerTideContentType(event, 'audio', tide<%= h.changeCase.camelCase(name) %>Module)
})
