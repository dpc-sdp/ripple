import { defineEventHandler } from 'h3'
import { registerTideContentType } from '@dpc-sdp/ripple-tide-api'
import tideLandingPageModule from '../../mapping'

export default defineEventHandler(async (event) => {
  registerTideContentType(event, 'landing_page', tideLandingPageModule)
})
