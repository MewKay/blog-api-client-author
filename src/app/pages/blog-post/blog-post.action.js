import paths from "@/app/routes/paths";
import actionServiceHandler from "@/lib/actionServiceHandler";
import sqids from "@/lib/sqids";
import authService from "@/services/auth.service";
import commentService from "@/services/comment.service";
import { redirect } from "react-router-dom";

const blogPostAction = async ({ request, params }) => {
  const formData = await request.formData();
  const commentId = formData.get("commentId");

  const { encodedId, slug } = params;
  const authData = authService.getAuthData();

  return actionServiceHandler(async () => {
    const postId = sqids.decode(encodedId);
    await commentService.deleteOne({ postId, commentId }, authData.token);

    return redirect(paths.blogPost.getHref(encodedId, slug));
  });
};

export default blogPostAction;
