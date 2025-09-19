import { Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { Form } from "react-router-dom";

const DeleteCommentButton = ({ className, commentId }) => {
  const confirmMessage = "Are you sure you want to delete this comment ?";

  const handleConfirmClick = (event) => {
    if (!window.confirm(confirmMessage)) {
      event.preventDefault();
      return;
    }
  };

  return (
    <Form method="delete">
      <input type="hidden" name="commentId" value={commentId} />
      <button
        className={className}
        type="submit"
        name="intent"
        value="delete_comment"
        onClick={handleConfirmClick}
        aria-label="Delete this comment"
      >
        <Trash2 />
      </button>
    </Form>
  );
};

DeleteCommentButton.propTypes = {
  className: PropTypes.string,
  commentId: PropTypes.number.isRequired,
};

export default DeleteCommentButton;
