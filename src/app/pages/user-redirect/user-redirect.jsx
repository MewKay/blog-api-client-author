import RedirectLink from "@/components/redirect-link/redirect-link";
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
        Your account does not have sufficient permissions to access this
        platform. You may:
      </p>
      <ul>
        <RedirectLink path={paths.login.path} onClick={handleBackToLogin}>
          <p>Log in with a Writer account</p>
        </RedirectLink>
        <RedirectLink isRouterLink={false} path={BASIC_LOGIN_SITE_URL}>
          <p>Log in to public blog site</p>
        </RedirectLink>
        <RedirectLink path={""}>
          <p>Upgrade your account to a Writer</p>
        </RedirectLink>
      </ul>
    </main>
  );
};

export default UserRedirect;
