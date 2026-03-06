import authService from "@/services/auth.service";
import loginSchema from "@/lib/validation/schema/login-schema";
import { redirect } from "react-router-dom";
import paths from "@/app/routes/paths";
import actionServiceHandler from "@/lib/actionServiceHandler";

const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "login":
      return actionServiceHandler(async () => {
        const credentials = {
          username: formData.get("username"),
          password: formData.get("password"),
        };

        const validator = loginSchema.validateInputs(credentials);
        if (!validator.isFormValid) {
          return { error: "Provided credentials are invalid" };
        }

        const response = await authService.login(credentials);

        if (!response.user.is_author) {
          return redirect(paths.userRedirect.path);
        }

        return redirect(paths.home.path);
      });
    case "guest":
      return actionServiceHandler(async () => {
        await authService.signGuest();
        return redirect(paths.home.path);
      });
    default:
      throw new Error("Unexpected intent");
  }
};

export default loginAction;
