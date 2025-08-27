import PostForm from "@/features/post-form/post-form";
import { useActionData, useLoaderData } from "react-router-dom";

const EditPost = () => {
  const { post } = useLoaderData();
  const actionData = useActionData();

  return (
    <main>
      {actionData && (
        <ul>
          {Array.isArray(actionData.error) ? (
            actionData.error.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))
          ) : (
            <li>{actionData.error}</li>
          )}
        </ul>
      )}

      <PostForm postToEdit={post} />
    </main>
  );
};

export default EditPost;
