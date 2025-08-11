import APIError from "./api.error";

class AuthError extends APIError {
  constructor(response) {
    super("Unauthorized", 401, response);
    this.name = "AuthError";
  }
}

export default AuthError;
