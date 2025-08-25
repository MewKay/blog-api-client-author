import PostForm from "@/features/post-form/post-form";
import { useLoaderData } from "react-router-dom";

const EditPost = () => {
  const { post } = useLoaderData();

  return (
    <main>
      <PostForm postToEdit={post} />
    </main>
  );
};

export default EditPost;
