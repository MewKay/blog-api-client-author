import ROUTES_PATH from "@/app/routes/path";
import SignUpForm from "@/features/signup-form/signup-form";
import authService from "@/services/auth.service";
import { Link, Navigate, useActionData } from "react-router-dom";

const SignUp = () => {
  const actionData = useActionData();

  if (authService.getUser()) {
    return <Navigate to={"/"} />;
  }

  return (
    <main>
      <div>
        <h3>Create your account</h3>

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

        <SignUpForm />
      </div>
      <div>
        <p>
          Already have an account?{" "}
          <Link to={`/${ROUTES_PATH.login}`}>Log in here.</Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
