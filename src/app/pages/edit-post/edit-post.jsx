import ActionErrorMessages from "@/components/action-error-messages/action-error-messages";
import PostForm from "@/features/post-form/post-form";
import { useActionData, useLoaderData } from "react-router-dom";

const EditPost = () => {
  const { post } = useLoaderData();
  const actionData = useActionData();

  return (
    <main>
      <ActionErrorMessages actionData={actionData} />
      <PostForm postToEdit={post} />
    </main>
  );
};

export default EditPost;
