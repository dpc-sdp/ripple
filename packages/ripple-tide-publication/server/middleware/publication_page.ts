import { defineEventHandler } from 'h3'
import { registerTideContentType } from '@dpc-sdp/ripple-tide-api'
import tidePublicationPageModule from '../../mapping/publication-page.js'

export default defineEventHandler(async (event) => {
  registerTideContentType(event, 'publication_page', tidePublicationPageModule)
})
