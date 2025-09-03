import authService from "@/services/auth.service";
import { redirect } from "react-router-dom";
import paths from "../routes/paths";

const layoutLoader = () => {
  const authData = authService.getAuthData();

  if (!authData) {
    return redirect(paths.login.path);
  }

  return authData;
};

export default layoutLoader;
