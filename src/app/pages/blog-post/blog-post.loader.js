import paths from "@/app/routes/paths";
import sqids from "@/lib/sqids";
import authService from "@/services/auth.service";
import commentService from "@/services/comment.service";
import postService from "@/services/post.service";
import { redirect } from "react-router-dom";

const blogPostLoader = async ({ params }) => {
  const user = authService.getUser();
  const token = authService.getToken();

  if (!user || !token) {
    return redirect(paths.login.path);
  }

  const { encodedId, slug } = params;
  const postId = sqids.decode(encodedId);
  const post = await postService.getAuthorPost(
    { authorId: user.id, postId },
    token,
  );

  if (post.slug !== slug) {
    return redirect(paths.blogPost.getHref(encodedId, post.slug));
  }

  const comments = await commentService.getAllByPostId(postId);

  return { post, comments };
};

export default blogPostLoader;
