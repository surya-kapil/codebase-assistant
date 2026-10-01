class ApiResponse {
  constructor(statusCode, data, message = "Success", codeMessage = "") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.codeMessage = codeMessage;
  }
}

export { ApiResponse };
