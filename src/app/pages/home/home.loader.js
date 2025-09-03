import authService from "@/services/auth.service";
import postService from "@/services/post.service";

const homeLoader = async () => {
  const authData = authService.getAuthData();
  const { user, token } = authData;
  const posts = await postService.getAuthorPosts(user.id, token);
  return { posts };
};

export default homeLoader;
