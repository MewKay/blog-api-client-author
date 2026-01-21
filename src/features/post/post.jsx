import PropTypes from "prop-types";
import PublishButton from "@/components/publish-button/publish-button";
import Markdown from "@/components/markdown/markdown";
import { Link } from "react-router-dom";
import { BookCheck, NotebookPen } from "lucide-react";
import { isSameDay } from "date-fns";
import { formatPostDate } from "./post.util";
import styles from "./post.module.css";
import postStyles from "./post-text.module.css";

const Post = ({ post, editPostLink }) => {
  const { title, text, created_at, edited_at, is_published } = post;

  const formattedCreateDate = formatPostDate(created_at);
  const formattedEditDate = formatPostDate(edited_at);
  const isPostEdited = !isSameDay(formattedCreateDate, formattedEditDate);

  return (
    <div className={styles.postContainer}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.date}>
        {formattedCreateDate}
        {isPostEdited && ` ( Last edited ${formattedEditDate} )`}
      </p>
      <Markdown
        classNames={{
          container: postStyles.text,
          tableWrapper: postStyles.tableContainer,
        }}
      >
        {text}
      </Markdown>
      <div className={styles.buttonContainer}>
        {is_published ? (
          <p className={styles.publishStatus}>
            <BookCheck /> Published
          </p>
        ) : (
          <PublishButton
            className={styles.publishButton}
            postData={{ title, text }}
          />
        )}
        <Link className={styles.editLink} to={editPostLink}>
          <NotebookPen /> Edit this post
        </Link>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    edited_at: PropTypes.string.isRequired,
    is_published: PropTypes.bool.isRequired,
  }),
  editPostLink: PropTypes.string.isRequired,
};

export default Post;
