import PostForm from "@/features/post-form/post-form";
import { useActionData } from "react-router-dom";

const NewPost = () => {
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

      <PostForm />
    </main>
  );
};

export default NewPost;
