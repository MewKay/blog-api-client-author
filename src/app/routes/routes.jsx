import Layout from "../layout/layout";
import BlogPost from "../pages/blog-post/blog-post";
import blogPostLoader from "../pages/blog-post/blog-post.loader";
import deleteCommentAction from "../pages/delete-comment/delete-comment.action";
import Home from "../pages/home/home";
import homeLoader from "../pages/home/home.loader";
import Login from "../pages/login/login";
import loginAction from "../pages/login/login.action";
import SignUp from "../pages/signup/signup";
import signUpAction from "../pages/signup/signup.action";
import UserRedirect from "../pages/user-redirect/user-redirect";
import paths from "./paths";

const routes = [
  {
    path: paths.home.path,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: paths.blogPost.path,
        element: <BlogPost />,
        loader: blogPostLoader,
      },
      {
        path: paths.deleteComment.path,
        action: deleteCommentAction,
      },
    ],
  },
  {
    path: paths.login.path,
    element: <Login />,
    action: loginAction,
  },
  {
    path: paths.signup.path,
    element: <SignUp />,
    action: signUpAction,
  },
  {
    path: paths.userRedirect.path,
    element: <UserRedirect />,
  },
];

export default routes;
