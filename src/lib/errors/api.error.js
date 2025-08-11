class APIError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.response = response;
  }
}

export default APIError;
