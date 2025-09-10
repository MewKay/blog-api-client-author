import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatPostDate } from "./post-item.util";
import sqids from "@/lib/sqids";
import styles from "./post-item.module.css";
import paths from "@/app/routes/paths";

const PostItem = ({ post }) => {
  const { id, title, preview, created_at, edited_at, is_published, slug } =
    post;
  const encodedId = sqids.encode(id);

  const postDate = formatPostDate(created_at);
  const postUpdateDate = formatPostDate(edited_at);
  const wasPostUpdated = created_at !== edited_at;

  return (
    <li>
      <div className={styles.postItem}>
        <Link
          to={paths.blogPost.getHref(encodedId, slug)}
          className={styles.postLink}
        >
          <h3>{title}</h3>
          <div className={styles.dateContainer}>
            <p>Created : {postDate}</p>
            {wasPostUpdated && (
              <>
                <p>&middot;</p>
                <p>Last Update : {postUpdateDate}</p>
              </>
            )}
          </div>
          <p className={styles.preview}>{preview}</p>
          <div className={styles.publicationContainer}>
            {is_published ? <p>✅️ Published</p> : <p>❎️ Unpublished</p>}
          </div>
        </Link>
      </div>
    </li>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    edited_at: PropTypes.string.isRequired,
    is_published: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
  }),
};

export default PostItem;
