import DeleteCommentButton from "@/components/delete-comment-button/delete-comment-button";
import { formatDistanceToNowStrict } from "date-fns";
import PropTypes from "prop-types";
import styles from "./comment-item.module.css";

const CommentItem = ({ comment, onClick }) => {
  const { id, user, text, edited_at, created_at } = comment;

  const isCommentEdited = edited_at !== created_at;

  const formattedDate = formatDistanceToNowStrict(created_at, {
    addSuffix: true,
  });

  return (
    <li className={styles.commentContainer} onClick={onClick}>
      <div className={styles.head}>
        <p className={styles.username}>{user.username}</p>
        <p>&middot;</p>
        <span className={styles.commentDetails}>
          <p> {formattedDate}</p>
          {isCommentEdited && <p>(edited)</p>}
        </span>
      </div>
      <p>{text}</p>
      <DeleteCommentButton className={styles.deleteButton} commentId={id} />
    </li>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
    text: PropTypes.string.isRequired,
    edited_at: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default CommentItem;
