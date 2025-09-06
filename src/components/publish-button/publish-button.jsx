import PropTypes from "prop-types";
import { Form } from "react-router-dom";

const PublishButton = ({ postData }) => {
  const { title, text } = postData;

  return (
    <Form method="put">
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="text" value={text} />
      <button type="submit" name="intent" value="publish">
        Publish post
      </button>
    </Form>
  );
};

PublishButton.propTypes = {
  postData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default PublishButton;
