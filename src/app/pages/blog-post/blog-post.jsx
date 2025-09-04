import paths from "@/app/routes/paths";
import ActionErrorMessages from "@/components/action-error-messages/action-error-messages";
import CommentList from "@/features/comment-list/comment-list";
import Post from "@/features/post/post";
import {
  Link,
  useActionData,
  useLoaderData,
  useParams,
} from "react-router-dom";

const BlogPost = () => {
  const { post, comments } = useLoaderData();
  const actionData = useActionData();
  const { encodedId, slug } = useParams();
  const editPostLink = paths.editBlogPost.getHref(encodedId, slug);

  return (
    <main>
      <ActionErrorMessages actionData={actionData} />
      <Link to={paths.home.path}>{"<--"} Back to blog list</Link>
      <Post post={post} editPostLink={editPostLink} />
      <CommentList comments={comments} />
    </main>
  );
};

export default BlogPost;
