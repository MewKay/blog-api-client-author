import { Form } from "react-router-dom";

const PublishButton = () => {
  return (
    <Form method="put">
      <button type="submit" name="intent" value="publish">
        Publish post
      </button>
    </Form>
  );
};

export default PublishButton;
