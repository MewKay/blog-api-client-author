import APIError from "./api.error";

class ServerError extends APIError {
  constructor(response) {
    super("Internal Server Error", 500, response);
    this.name = "ServerError";
  }
}

export default ServerError;
