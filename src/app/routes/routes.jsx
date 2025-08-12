import Login from "../pages/login/login";
import loginAction from "../pages/login/login.action";
import ROUTES_PATH from "./path";

const routes = [
  {
    path: "/",
    element: <>Hello World!</>,
  },
  {
    path: ROUTES_PATH.login,
    element: <Login />,
    action: loginAction,
  },
];

export default routes;
