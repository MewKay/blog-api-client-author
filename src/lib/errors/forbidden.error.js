import APIError from "./api.error";

class ForbiddenError extends APIError {
  constructor(response) {
    super("Permission denied", 403, response);
    this.name = "ForbiddenError";
  }
}

export default ForbiddenError;
