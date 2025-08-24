import paths from "@/app/routes/paths";
import authService from "@/services/auth.service";
import { redirect } from "react-router-dom";

const loginLoader = () => {
  const authData = authService.getAuthData();

  if (authData) {
    return redirect(paths.home.path);
  }

  return null;
};

export default loginLoader;
