import Layout from "../layout/layout";
import BlogPost from "../pages/blog-post/blog-post";
import blogPostLoader from "../pages/blog-post/blog-post.loader";
import Home from "../pages/home/home";
import homeLoader from "../pages/home/home.loader";
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
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      {
        path: ROUTES_PATH.blogPost,
        element: <BlogPost />,
        loader: blogPostLoader,
      },
    ],
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
