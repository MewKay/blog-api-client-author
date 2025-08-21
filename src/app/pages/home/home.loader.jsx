import ROUTES_PATH from "@/app/routes/path";
import authService from "@/services/auth.service";
import postService from "@/services/post.service";
import { redirect } from "react-router-dom";

const homeLoader = async () => {
  const author = authService.getUser();
  const token = authService.getToken();

  if (!author || !token) {
    return redirect(ROUTES_PATH.login);
  }

  const posts = await postService.getAuthorPosts(author.id, token);
  return { posts };
};

export default homeLoader;
