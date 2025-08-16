import loginSchema from "@/lib/validation/schema/login-schema";
import authService from "@/services/auth.service";
import BadRequestError from "@/lib/errors/bad-request.error";
import { redirect } from "react-router-dom";
import AuthError from "@/lib/errors/auth.error";

const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const credentials = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const validator = loginSchema.validateInputs(credentials);
  if (!validator.isFormValid) {
    return { error: "Provided credentials are invalid" };
  }

  try {
    const response = await authService.login(credentials);

    if (!response.user.is_author) {
      return redirect("/user-redirect");
    }

    return redirect("/");
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof AuthError) {
      return error.response;
    }

    throw error;
  }
};

export default loginAction;
