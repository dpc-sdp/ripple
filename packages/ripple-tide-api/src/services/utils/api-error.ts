export default class TideApiError extends Error {
  status: number
  name: string
  message: string
  debug: boolean
  date: Date
  constructor ({ status = 500, message = 'Error', debug = false }, ...params) {
    super(...params)
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TideApiError)
    }

    this.name = 'TideError'
    // Custom debugging information
    this.status = status
    this.message = message
    this.debug = debug
    this.date = new Date()
  }
}
