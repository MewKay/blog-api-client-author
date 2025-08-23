import paths from "@/app/routes/paths";
import authService from "@/services/auth.service";
import postService from "@/services/post.service";
import { redirect } from "react-router-dom";

const homeLoader = async () => {
  const author = authService.getUser();
  const token = authService.getToken();

  if (!author || !token) {
    return redirect(paths.login.path);
  }

  const posts = await postService.getAuthorPosts(author.id, token);
  return { posts };
};

export default homeLoader;
