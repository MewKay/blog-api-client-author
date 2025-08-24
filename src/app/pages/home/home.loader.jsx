import paths from "@/app/routes/paths";
import authService from "@/services/auth.service";
import postService from "@/services/post.service";
import { redirect } from "react-router-dom";

const homeLoader = async () => {
  const authData = authService.getAuthData();

  if (!authData) {
    return redirect(paths.login.path);
  }

  const { user, token } = authData;
  const posts = await postService.getAuthorPosts(user.id, token);
  return { posts };
};

export default homeLoader;
