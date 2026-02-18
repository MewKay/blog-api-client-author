import { Form } from "react-router-dom";
import styles from "./guest-form.module.css";

const GuestForm = () => {
  return (
    <Form method="post">
      <button className={styles.button} name="intent" value="guest">
        Continue with a Guest account
      </button>
    </Form>
  );
};

export default GuestForm;
