import authService from "@/services/auth.service";
import signUpSchema from "@/lib/validation/schema/signup-schema";
import AuthError from "@/lib/errors/auth.error";
import BadRequestError from "@/lib/errors/bad-request.error";
import { redirect } from "react-router-dom";
import paths from "@/app/routes/paths";
import ForbiddenError from "@/lib/errors/forbidden.error";

const signUpAction = async ({ request }) => {
  const formData = await request.formData();

  const signUpData = {
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    author_password: formData.get("author_password"),
  };

  const validator = signUpSchema.validateInputs(signUpData);

  if (!validator.isFormValid) {
    return { error: "Provided inputs are invalid" };
  }

  try {
    await authService.signup(signUpData);
    return redirect(paths.login.path);
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

export default signUpAction;
