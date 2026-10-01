class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    codeMessage = "",
    errors = []
  ) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    this.codeMessage = codeMessage;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
