import PostForm from "@/features/post-form/post-form";
import ActionErrorMessages from "@/components/action-error-messages/action-error-messages";
import { useActionData } from "react-router-dom";

const NewPost = () => {
  const actionData = useActionData();

  return (
    <main>
      <ActionErrorMessages actionData={actionData} />
      <PostForm />
    </main>
  );
};

export default NewPost;
