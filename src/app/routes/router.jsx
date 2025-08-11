import ROUTES_PATH from "./path";

const routes = [
  {
    path: "/",
    element: <>Hello World!</>,
  },
  {
    path: ROUTES_PATH.login,
    element: <>This is log in page</>,
  },
];

export default routes;
