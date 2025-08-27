import paths from "@/app/routes/paths";
import actionServiceHandler from "@/lib/actionServiceHandler";
import sqids from "@/lib/sqids";
import postSchema from "@/lib/validation/schema/post-schema";
import authService from "@/services/auth.service";
import postService from "@/services/post.service";
import { redirect } from "react-router-dom";

const editPostAction = async ({ params, request }) => {
  const { token } = authService.getAuthData();
  const formData = await request.formData();
  const postId = sqids.decode(params.encodedId);

  const intent = formData.get("intent");

  if (intent === "delete") {
    return actionServiceHandler(async () => {
      await postService.deletePost(postId, token);
      return redirect(paths.home.path);
    });
  }

  const editPost = {
    title: formData.get("title"),
    text: formData.get("text"),
    is_published: formData.get("is_published") === "true",
  };

  const validator = postSchema.validateInputs(editPost);

  if (!validator.isFormValid) {
    return { error: "Provided inputs are invalid" };
  }

  return actionServiceHandler(async () => {
    const { id, slug } = await postService.updatePost(postId, editPost, token);
    const encodedId = sqids.encode(id);

    return redirect(paths.blogPost.getHref(encodedId, slug));
  });
};

export default editPostAction;
