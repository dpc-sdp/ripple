//@ts-nocheck import typing needs fixing
import { H3Event, sendError, createError } from 'h3'
import { logger } from '../index.js'
import { UserFacingError } from '../errors/errors.js'

const getPublicFacingStatusCode = (status: number) => {
  switch (status) {
    // obscure 403 errors to prevent leaking existence of secure pages
    case 404:
    case 403:
      return 404
    default:
      return status
  }
}

const getPublicFacingStatusMessage = (status: number) => {
  switch (status) {
    // obscure 403 errors to prevent leaking existence of secure pages
    case 404:
    case 403:
      return 'Page not found'
    case 401:
      return 'Unauthorized'
    case 400:
      return 'Bad request'
    case 503:
    case 500:
      return 'Server is not available'
    default:
      return 'Error fetching data'
  }
}

export const createHandler = async (
  event: H3Event,
  logLabel: string,
  handlerFn: () => Promise<any>
) => {
  try {
    logger.info(`Handling request for ${event.req.url}`, {
      label: logLabel
    })

    return await handlerFn()
  } catch (error) {
    if (error instanceof UserFacingError) {
      sendError(
        event,
        createError({
          statusCode: getPublicFacingStatusCode(error.statusCode),
          statusMessage: getPublicFacingStatusMessage(error.statusCode)
        })
      )
      logger.info(`User error occurred when ${event.req.url} was requested:`, {
        error,
        label: logLabel
      })
    } else {
      sendError(
        event,
        createError({
          statusCode: 500,
          statusMessage: 'Something went wrong'
        })
      )
      logger.error(
        `Internal error occurred when ${event.req.url} was requested:`,
        {
          error,
          label: logLabel
        }
      )
    }
  }
}
