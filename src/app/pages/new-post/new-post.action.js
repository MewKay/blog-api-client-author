import paths from "@/app/routes/paths";
import actionServiceHandler from "@/lib/actionServiceHandler";
import sqids from "@/lib/sqids";
import postSchema from "@/lib/validation/schema/post-schema";
import authService from "@/services/auth.service";
import postService from "@/services/post.service";
import { redirect } from "react-router-dom";

const newPostAction = async ({ request }) => {
  const { token } = authService.getAuthData();
  const formData = await request.formData();

  const newPost = {
    title: formData.get("title"),
    text: formData.get("text"),
    is_published: formData.get("is_published") === "true",
  };

  const validator = postSchema.validateInputs(newPost);

  if (!validator.isFormValid) {
    return { error: validator.errorMessages };
  }

  return actionServiceHandler(async () => {
    const { id, slug } = await postService.createPost(newPost, token);
    const encodedId = sqids.encode(id);

    return redirect(paths.blogPost.getHref(encodedId, slug));
  });
};

export default newPostAction;
