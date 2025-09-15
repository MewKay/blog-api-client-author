import paths from "@/app/routes/paths";
import ActionErrorMessages from "@/components/action-error-messages/action-error-messages";
import SignUpForm from "@/features/signup-form/signup-form";
import { Link, useActionData } from "react-router-dom";
import styles from "@/styles/components/auth-form.module.css";

const SignUp = () => {
  const actionData = useActionData();

  return (
    <main className={styles.formMain}>
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>Create your account</h3>

        <ActionErrorMessages actionData={actionData} />
        <SignUpForm />
      </div>
      <div className={styles.prompt}>
        <p>
          Already have an account ?{" "}
          <Link to={paths.login.path}>Log in here.</Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
