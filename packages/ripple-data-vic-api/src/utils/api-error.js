export default class ApiError extends Error {
  constructor ({ status = 500, message = 'Error', debug = false }, ...params) {
    super(...params)
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }

    this.name = 'ApiError'
    // Custom debugging information
    this.status = status
    this.message = message
    this.debug = debug
    this.date = new Date()
  }
}
