import AuthorPasswordInput from "@/components/author-password-input/author-password-input";
import Button from "@/components/button/button";
import { useState } from "react";
import { Form } from "react-router-dom";
import styles from "./user-upgrade.module.css";

const UserUpgrade = () => {
  const [authorPassword, setAuthorPassword] = useState("");

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Form method="post">
          <p className={styles.prompt}>
            Please enter the author password to confirm and upgrade your account
            to a Writer.
          </p>

          <AuthorPasswordInput
            value={authorPassword}
            setValue={setAuthorPassword}
          />

          <div className={styles.buttonContainer}>
            <Button colorScheme={"dark"} className={styles.submit}>
              Confirm
            </Button>
          </div>
        </Form>
      </div>
    </main>
  );
};

export default UserUpgrade;
