import AuthRedirect from "@/components/auth-redirect/auth-redirect";
import LoginForm from "@/features/login-form/login-form";
import { Link, useActionData } from "react-router-dom";

const Login = () => {
  const actionData = useActionData();

  return (
    <AuthRedirect>
      <main>
        <div>
          <h3>Log in to your account</h3>

          {actionData && (
            <ul>
              {Array.isArray(actionData.error) ? (
                actionData.error.map((errorMessage, index) => (
                  <li key={index}>{errorMessage}</li>
                ))
              ) : (
                <li>{actionData.error}</li>
              )}
            </ul>
          )}

          <LoginForm />
        </div>
        <div>
          Don&apos;t have an account yet ?{" "}
          <Link to={"/sign-up"}>Sign up here</Link>.
        </div>
      </main>
    </AuthRedirect>
  );
};

export default Login;
