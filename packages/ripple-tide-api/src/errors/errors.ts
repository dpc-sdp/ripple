export class ApplicationError extends Error {
  get name() {
    return this.constructor.name
  }
}

export class UserFacingError extends ApplicationError {}

export class BadRequestError extends UserFacingError {
  get statusCode() {
    return 400
  }
}

export class NotFoundError extends UserFacingError {
  get statusCode() {
    return 404
  }
}

export class UnauthorisedError extends UserFacingError {
  get statusCode() {
    return 401
  }
}

export class WrappedAxiosError extends ApplicationError {
  public axiosError

  constructor(message, axiosError) {
    super(message)

    this.axiosError = axiosError
  }
}
