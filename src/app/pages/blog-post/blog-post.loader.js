import ROUTES_PATH from "@/app/routes/path";
import sqids from "@/lib/sqids";
import authService from "@/services/auth.service";
import commentService from "@/services/comment.service";
import postService from "@/services/post.service";
import { redirect } from "react-router-dom";

const blogPostLoader = async ({ params }) => {
  const user = authService.getUser();
  const token = authService.getToken();

  if (!user || !token) {
    return redirect(ROUTES_PATH.login);
  }

  const { encodedId, slug } = params;
  const postId = sqids.decode(encodedId);
  const post = await postService.getAuthorPost(
    { authorId: user.id, postId },
    token,
  );

  if (post.slug !== slug) {
    return redirect(
      ROUTES_PATH.blogPost
        .replace(":encodedId", encodedId)
        .replace(":slug", post.slug),
    );
  }

  const comments = await commentService.getAllByPostId(postId);
  const editPostLink = `/posts/edit/${encodedId}/${post.slug}`;

  return { post, comments, editPostLink };
};

export default blogPostLoader;
