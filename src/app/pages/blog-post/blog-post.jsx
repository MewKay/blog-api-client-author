import paths from "@/app/routes/paths";
import CommentList from "@/features/comment-list/comment-list";
import Post from "@/features/post/post";
import { Link, useLoaderData, useParams } from "react-router-dom";

const BlogPost = () => {
  const { post, comments } = useLoaderData();
  const { encodedId, slug } = useParams();
  const editPostLink = paths.editBlogPost.getHref(encodedId, slug);

  return (
    <main>
      <Link to={paths.home.path}>{"<--"} Back to blog list</Link>
      <Post post={post} editPostLink={editPostLink} />
      <CommentList comments={comments} />
    </main>
  );
};

export default BlogPost;
