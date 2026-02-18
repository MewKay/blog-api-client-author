import authService from "@/services/auth.service";
import { redirect } from "react-router-dom";
import paths from "../routes/paths";
import authorService from "@/services/author.service";

const layoutLoader = async () => {
  const authData = authService.getAuthData();

  if (!authData) {
    return redirect(paths.login.path);
  }

  const { user, token } = authData;

  const limitStatus = await authorService.getLimitStatus(user.id, token);

  return { user, limitStatus };
};

export default layoutLoader;
