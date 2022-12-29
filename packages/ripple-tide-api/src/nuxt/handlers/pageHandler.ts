//@ts-nocheck import typing needs fixing
import { defineEventHandler, getQuery, H3Event } from 'h3'
import { createHandler } from '@dpc-sdp/ripple-tide-api'
import { BadRequestError } from '@dpc-sdp/ripple-tide-api/errors'
import { TidePage } from '../../services'

export const createPageHandler = async (
  event: H3Event,
  tidePageApi: TidePage
) => {
  return createHandler(event, 'TidePageHandler', async () => {
    const query = await getQuery(event)

    if (!query.path || Array.isArray(query.path)) {
      throw new BadRequestError('Path is required')
    }

    if (Array.isArray(query.site)) {
      throw new BadRequestError('Duplicate site values')
    }

    return await tidePageApi.getPageByPath(query.path, query.site)
  })
}

export default defineEventHandler(async (event: H3Event) => {
  return createPageHandler(event, event.context.tide.pageApi)
})
