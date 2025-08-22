import ROUTES_PATH from "@/app/routes/path";
import CommentList from "@/features/comment-list/comment-list";
import Post from "@/features/post/post";
import { Link, useLoaderData } from "react-router-dom";

const BlogPost = () => {
  const { post, comments, editPostLink } = useLoaderData();

  return (
    <main>
      <Link to={ROUTES_PATH.home}>{"<--"} Back to blog list</Link>
      <Post post={post} editPostLink={editPostLink} />
      <CommentList comments={comments} />
    </main>
  );
};

export default BlogPost;
