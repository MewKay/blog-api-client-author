import PropTypes from "prop-types";

const PostList = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>
            Created : {post.created_at} &middot; Last Update : {post.updated_at}
          </p>
          <p>{post.preview}</p>
        </li>
      ))}
    </ul>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
