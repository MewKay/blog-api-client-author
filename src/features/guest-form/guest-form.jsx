import { Form } from "react-router-dom";

const GuestForm = () => {
  return (
    <Form method="post">
      <button name="intent" value="guest">
        Continue with a Guest account
      </button>
    </Form>
  );
};

export default GuestForm;
