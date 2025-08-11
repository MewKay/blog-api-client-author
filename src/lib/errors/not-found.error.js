import APIError from "./api.error";

class NotFoundError extends APIError {
  constructor(response) {
    super("Resource not found", 404, response);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
