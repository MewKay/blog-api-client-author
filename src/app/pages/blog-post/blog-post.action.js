import paths from "@/app/routes/paths";
import actionServiceHandler from "@/lib/actionServiceHandler";
import sqids from "@/lib/sqids";
import authService from "@/services/auth.service";
import commentService from "@/services/comment.service";
import postService from "@/services/post.service";
import { redirect } from "react-router-dom";

const blogPostAction = async ({ request, params }) => {
  const { token } = authService.getAuthData();
  const formData = await request.formData();
  const { encodedId, slug } = params;
  const postId = sqids.decode(encodedId);

  const intent = formData.get("intent");

  switch (intent) {
    case "publish":
      return actionServiceHandler(async () => {
        const title = formData.get("title");
        const text = formData.get("text");
        await postService.updatePost(
          postId,
          { title, text, is_published: true },
          token,
        );

        return redirect(paths.blogPost.getHref(encodedId, slug));
      });
    case "delete_comment":
      return actionServiceHandler(async () => {
        const commentId = formData.get("commentId");
        await commentService.deleteOne({ postId, commentId }, token);

        return redirect(paths.blogPost.getHref(encodedId, slug));
      });
    default:
      throw new Error("Unexpected intent");
  }
};

export default blogPostAction;
