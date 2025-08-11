import APIError from "./api.error";

class BadRequestError extends APIError {
  constructor(message, response) {
    super(message, 400, response);
    this.name = "BadRequestError";
  }
}

export default BadRequestError;
