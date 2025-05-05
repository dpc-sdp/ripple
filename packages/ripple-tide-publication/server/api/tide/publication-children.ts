//@ts-nocheck runtime imports
import { defineEventHandler, getQuery, H3Event } from 'h3'
import { createHandler, TidePageApi } from '@dpc-sdp/ripple-tide-api'
import { BadRequestError } from '@dpc-sdp/ripple-tide-api/errors'
import { useNitroApp } from '#imports'
export const createPageHandler = async (
  event: H3Event,
  tidePageApi: TidePageApi
) => {
  return createHandler(event, 'TidePageHandler', async () => {
    const query: any = await getQuery(event)

    if (!query.ids) {
      throw new BadRequestError('Publication child ids are required')
    }

    // ids can come in as an array or a single string, we normalise it here
    const idList = typeof query.ids === 'string' ? [query.ids] : query.ids

    const publicationPageRouteDetails = {
      entity_type: 'node',
      bundle: 'publication_page'
    }

    const filters = {
      pub: {
        condition: {
          operator: 'IN',
          path: 'nid',
          value: idList
        }
      }
    }

    const includes = tidePageApi.getResourceIncludes(
      publicationPageRouteDetails
    )

    const children = await tidePageApi.getEntityList(
      publicationPageRouteDetails.entity_type,
      publicationPageRouteDetails.bundle,
      filters,
      includes
    )

    const sortedChildren = idList
      .map((id) => {
        return children.find((page) => {
          return `${page.drupal_internal__nid}` === id
        })
      })
      .filter((s) => s)

    return await Promise.all(
      sortedChildren.map(async (child) => {
        return await tidePageApi.getTidePage(child, publicationPageRouteDetails)
      })
    )
  })
}

export default defineEventHandler(async (event: H3Event) => {
  const nitroApp = useNitroApp()
  return createPageHandler(event, nitroApp.tide.pageApi)
})
