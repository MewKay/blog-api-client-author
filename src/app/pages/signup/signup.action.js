import authService from "@/services/auth.service";
import signUpSchema from "@/lib/validation/schema/signup-schema";
import { redirect } from "react-router-dom";
import paths from "@/app/routes/paths";
import actionServiceHandler from "@/lib/actionServiceHandler";

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

  return actionServiceHandler(async () => {
    await authService.signup(signUpData);
    return redirect(paths.login.path);
  });
};

export default signUpAction;
