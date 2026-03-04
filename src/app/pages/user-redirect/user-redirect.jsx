import RedirectLink from "@/components/redirect-link/redirect-link";
import paths from "@/app/routes/paths";
import authService from "@/services/auth.service";
import styles from "./user-redirect.module.css";

const BASIC_LOGIN_SITE_URL = import.meta.env.VITE_BASIC_LOGIN_SITE_URL;

const UserRedirect = () => {
  const handleBackToLogin = () => {
    authService.logout();
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.title}>Account Access Limitations</h2>
        <p className={styles.text}>
          Your account does not have sufficient permissions to access this
          platform. You may:
        </p>
        <ul className={styles.actionContainer}>
          <RedirectLink path={paths.login.path} onClick={handleBackToLogin}>
            <p>Log in with a Writer account</p>
          </RedirectLink>
          <RedirectLink isRouterLink={false} path={BASIC_LOGIN_SITE_URL}>
            <p>Log in to public blog site</p>
          </RedirectLink>
          <RedirectLink colorscheme="dark" path={paths.userUpgrade.path}>
            <p>Upgrade your account to a Writer</p>
          </RedirectLink>
        </ul>
      </div>
    </main>
  );
};

export default UserRedirect;
