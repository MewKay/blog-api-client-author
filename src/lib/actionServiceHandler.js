import AuthError from "./errors/auth.error";
import BadRequestError from "./errors/bad-request.error";
import ForbiddenError from "./errors/forbidden.error";

const actionServiceHandler = async (callback) => {
  try {
    const result = await callback();
    return result;
  } catch (error) {
    if (
      error instanceof BadRequestError ||
      error instanceof AuthError ||
      error instanceof ForbiddenError
    ) {
      return error.response;
    }

    throw error;
  }
};

export default actionServiceHandler;
