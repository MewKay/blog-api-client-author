import DeleteCommentButton from "@/components/delete-comment-button/delete-comment-button";
import { formatDistanceToNowStrict } from "date-fns";
import PropTypes from "prop-types";

const CommentItem = ({ comment }) => {
  const { id, user, text, edited_at, created_at } = comment;

  const isCommentEdited = edited_at !== created_at;

  const formattedDate = formatDistanceToNowStrict(created_at, {
    addSuffix: true,
  });

  return (
    <>
      <div>
        <h6>{user.username}</h6>
        <span>
          <p>&middot; {formattedDate}</p>
          {isCommentEdited && "(edited)"}
        </span>
      </div>
      <p>{text}</p>
      <DeleteCommentButton commentId={id} />
    </>
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
};

export default CommentItem;
