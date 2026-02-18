import PropTypes from "prop-types";
import PostItem from "./post-item/post-item";
import NoPost from "./no-post/no-post";
import styles from "./post-list.module.css";

const PostList = ({ posts }) => {
  return posts.length <= 0 ? (
    <NoPost />
  ) : (
    <div className={styles.container}>
      <ul className={styles.postPreviewList}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
