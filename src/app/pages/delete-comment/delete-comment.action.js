import paths from "@/app/routes/paths";
import AuthError from "@/lib/errors/auth.error";
import sqids from "@/lib/sqids";
import authService from "@/services/auth.service";
import commentService from "@/services/comment.service";
import { redirect } from "react-router-dom";

const deleteCommentAction = async ({ params }) => {
  const { encodedId, slug, commentId } = params;
  const authData = authService.getAuthData();

  if (!authData) {
    throw new AuthError({ error: "Request requires authentication." });
  }

  const postId = sqids.decode(encodedId);
  await commentService.deleteOne({ postId, commentId }, authData.token);

  return redirect(paths.blogPost.getHref(encodedId, slug));
};

export default deleteCommentAction;
