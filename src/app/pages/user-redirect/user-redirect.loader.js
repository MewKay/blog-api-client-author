import paths from "@/app/routes/paths";
import authService from "@/services/auth.service";
import { redirect } from "react-router-dom";

const userRedirectLoader = async () => {
  const authData = authService.getAuthData();

  if (!authData) {
    return redirect(paths.login.path);
  }

  return null;
};

export default userRedirectLoader;
