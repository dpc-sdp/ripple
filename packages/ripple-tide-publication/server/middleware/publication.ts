import { defineEventHandler } from 'h3'
import { registerTideContentType } from '@dpc-sdp/ripple-tide-api'
import tidePublicationModule from '../../mapping/publication.js'

export default defineEventHandler(async (event) => {
  registerTideContentType(event, 'publication', tidePublicationModule)
})
