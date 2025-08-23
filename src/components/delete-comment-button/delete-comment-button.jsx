import paths from "@/app/routes/paths";
import PropTypes from "prop-types";
import { Form, useParams } from "react-router-dom";

const DeleteCommentButton = ({ commentId }) => {
  const { encodedId, slug } = useParams();
  const confirmMessage = "Are you sure you want to delete this comment ?";

  const handleConfirmClick = (event) => {
    if (!window.confirm(confirmMessage)) {
      event.preventDefault();
      return;
    }
  };

  return (
    <Form
      method="delete"
      action={paths.deleteComment.getHref(encodedId, slug, commentId)}
    >
      <button onClick={handleConfirmClick}>Delete comment</button>
    </Form>
  );
};

DeleteCommentButton.propTypes = {
  commentId: PropTypes.number.isRequired,
};

export default DeleteCommentButton;
