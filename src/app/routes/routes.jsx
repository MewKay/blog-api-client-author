import Layout from "../layout/layout";
import Login from "../pages/login/login";
import loginAction from "../pages/login/login.action";
import SignUp from "../pages/signup/signup";
import signUpAction from "../pages/signup/signup.action";
import UserRedirect from "../pages/user-redirect/user-redirect";
import ROUTES_PATH from "./path";

const routes = [
  {
    path: ROUTES_PATH.home,
    element: <Layout />,
    children: [{ index: true, element: <>Hello World!</> }],
  },
  {
    path: ROUTES_PATH.login,
    element: <Login />,
    action: loginAction,
  },
  {
    path: ROUTES_PATH.signup,
    element: <SignUp />,
    action: signUpAction,
  },
  {
    path: ROUTES_PATH.userRedirect,
    element: <UserRedirect />,
  },
];

export default routes;
