import AuthorPasswordInput from "@/components/author-password-input/author-password-input";
import Button from "@/components/button/button";
import { Form, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import paths from "@/app/routes/paths";
import authService from "@/services/auth.service";
import styles from "./user-upgrade.module.css";

const UserUpgrade = () => {
  const [authorPassword, setAuthorPassword] = useState("");

  const handleBackToLogin = () => {
    authService.logout();
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link
          className={styles.backLink}
          to={paths.login.path}
          onClick={handleBackToLogin}
        >
          <ChevronLeft />
          Go back to log in page
        </Link>
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
