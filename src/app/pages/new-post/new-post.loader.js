import paths from "@/app/routes/paths";
import authService from "@/services/auth.service";
import authorService from "@/services/author.service";
import { redirect } from "react-router-dom";

const newPostLoader = async () => {
  const { user, token } = authService.getAuthData();
  const { isLimitReached } = await authorService.getLimitStatus(user.id, token);

  if (isLimitReached) {
    return redirect(paths.home.path);
  }

  return null;
};

export default newPostLoader;
