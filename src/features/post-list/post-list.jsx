import PropTypes from "prop-types";
import PostItem from "./post-item/post-item";

const PostList = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
