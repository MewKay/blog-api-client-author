import paths from "@/app/routes/paths";
import sqids from "@/lib/sqids";
import authService from "@/services/auth.service";
import postService from "@/services/post.service";
import { redirect } from "react-router-dom";

const editPostLoader = async ({ params }) => {
  const authData = authService.getAuthData();

  if (!authData) {
    return redirect(paths.login.path);
  }

  const { user, token } = authData;
  const { encodedId, slug } = params;
  const postId = sqids.decode(encodedId);
  const post = await postService.getAuthorPost(
    { authorId: user.id, postId },
    token,
  );

  if (post.slug !== slug) {
    return redirect(paths.editBlogPost.getHref(encodedId, post.slug));
  }

  return { post };
};

export default editPostLoader;
