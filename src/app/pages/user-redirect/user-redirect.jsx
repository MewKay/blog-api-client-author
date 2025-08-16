import authService from "@/services/auth.service";

const BASIC_LOGIN_SITE_URL = import.meta.env.VITE_BASIC_LOGIN_SITE_URL;

const UserRedirect = () => {
  const handleBackToLogin = () => {
    authService.logout();
  };

  return (
    <main>
      <h2>Account Access Limitations</h2>
      <p>
        Your account doesn&apos;t have sufficient permissions to access this
        platform. However you may access blog by signing in your basic user
        account.
      </p>
      <div>
        <a href="/log-in" onClick={handleBackToLogin}>
          Go back to log in
        </a>
        <a href={BASIC_LOGIN_SITE_URL}>Go to ThyBlog to log in as User</a>
      </div>
    </main>
  );
};

export default UserRedirect;
