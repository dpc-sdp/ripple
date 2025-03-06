export const useTideError = (
  statusCode: number,
  originalError?: Error
): void => {
  if (statusCode) {
    switch (statusCode) {
      case 404:
        throw createError({
          statusCode: 404,
          statusMessage:
            "Sorry, we couldn't find the page you were looking for.",
          message: `Have a look at the web address to make sure it was typed correctly. We may also have deleted this page.`,
          // Needs to be a fatal error in order to trigger a proper 404 page when this error occurs client side
          fatal: true
        })
        break

      case 401:
        throw createError({
          statusCode: 401,
          statusMessage: 'Please provide valid credentials.',
          message: `
              Authorization is required to read this page.
            `,
          // Needs to be a fatal error in order to trigger a proper 401 page when this error occurs client side
          fatal: true
        })
        break

      default:
        if (originalError) {
          trackError(originalError)
        }

        throw createError({
          statusCode: 500,
          statusMessage: 'We have a glitch in our system.',
          message: `We are aware of the issue. We appreciate your patience while we’re looking into it.`
        })
        break
    }
  }
}

export default useTideError
