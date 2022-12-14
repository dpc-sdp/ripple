import { defineEventHandler } from 'h3'
import tideLandingPageModule from '../../mapping'
export default defineEventHandler(async (event) => {
  if (event.node.req.url.includes('/api/tide/page')) {
    if (
      !event.context.tide?.pageApi?.contentTypes.hasOwnProperty('landing_page')
    ) {
      event.context.tide.pageApi.setContentType(
        'landing_page',
        tideLandingPageModule
      )
    }
  }
})
