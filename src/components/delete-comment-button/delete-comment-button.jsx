import PropTypes from "prop-types";
import { Form } from "react-router-dom";

const DeleteCommentButton = ({ commentId }) => {
  const confirmMessage = "Are you sure you want to delete this comment ?";

  const handleConfirmClick = (event) => {
    if (!window.confirm(confirmMessage)) {
      event.preventDefault();
      return;
    }
  };

  return (
    <Form method="delete" action={`${commentId}/delete`}>
      <button onClick={handleConfirmClick}>Delete comment</button>
    </Form>
  );
};

DeleteCommentButton.propTypes = {
  commentId: PropTypes.number.isRequired,
};

export default DeleteCommentButton;
