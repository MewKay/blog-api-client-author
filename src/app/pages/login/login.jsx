import LoginForm from "@/features/login-form/login-form";
import authService from "@/services/auth.service";
import { Link, Navigate, useActionData } from "react-router-dom";

const Login = () => {
  const actionData = useActionData();

  if (authService.getUser()) {
    return <Navigate to={"/"} />;
  }

  return (
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
  );
};

export default Login;
