//@ts-nocheck import typing needs fixing
import { defineEventHandler, getQuery, CompatibilityEvent } from 'h3'
import { createHandler } from '@dpc-sdp/ripple-tide-api'
import { TidePublicationIndex } from '../../services'

export const createPublicationIndexHandler = async (
  event: CompatibilityEvent,
  tidePublicationIndexApi: TidePublicationIndex
) => {
  return createHandler(event, 'PublicationIndexHandler', async () => {
    const query = await getQuery(event)

    if (!query.id) {
      throw new BadRequestError('Publication id is required')
    }

    return await tidePublicationIndexApi.getPublicationMenu(query.id)
  })
}

export default defineEventHandler(async (event: CompatibilityEvent) => {
  return createPublicationIndexHandler(
    event,
    event.context.tide.publicationIndexApi
  )
})
