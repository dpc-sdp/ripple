import { defineEventHandler } from 'h3'
import { registerTideContentType } from '@dpc-sdp/ripple-tide-api'
import tideEventModule from '../../mapping'

export default defineEventHandler(async (event) => {
  registerTideContentType(event, 'event', tideEventModule)
})
