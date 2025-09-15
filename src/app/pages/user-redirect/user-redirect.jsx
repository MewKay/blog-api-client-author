import paths from "@/app/routes/paths";
import authService from "@/services/auth.service";
import errorStyle from "@/styles/components/error-page.module.css";
import styles from "./user-redirect.module.css";

const BASIC_LOGIN_SITE_URL = import.meta.env.VITE_BASIC_LOGIN_SITE_URL;

const UserRedirect = () => {
  const handleBackToLogin = () => {
    authService.logout();
  };

  return (
    <main className={errorStyle.errorMain}>
      <h2 className={errorStyle.errorTitle}>Account Access Limitations</h2>
      <p className={errorStyle.errorText}>
        Your account doesn&apos;t have sufficient permissions to access this
        platform. However you may access blog by signing in your basic user
        account.
      </p>
      <div className={errorStyle.buttonContainer}>
        <a
          className={styles.actionLink}
          href={paths.login.path}
          onClick={handleBackToLogin}
        >
          Go back to log in
        </a>
        <a className={styles.actionLink} href={BASIC_LOGIN_SITE_URL}>
          Go to ThyBlog to log in as User
        </a>
      </div>
    </main>
  );
};

export default UserRedirect;
