import ErrorBoundary from "../layout/error-boundary/error-boundary";
import Layout from "../layout/layout";
import layoutLoader from "../layout/layout.loader";
import BlogPost from "../pages/blog-post/blog-post";
import blogPostAction from "../pages/blog-post/blog-post.action";
import blogPostLoader from "../pages/blog-post/blog-post.loader";
import EditPost from "../pages/edit-post/edit-post";
import editPostAction from "../pages/edit-post/edit-post.action";
import editPostLoader from "../pages/edit-post/edit-post.loader";
import Home from "../pages/home/home";
import homeLoader from "../pages/home/home.loader";
import Login from "../pages/login/login";
import loginAction from "../pages/login/login.action";
import loginLoader from "../pages/login/login.loader";
import NewPost from "../pages/new-post/new-post";
import newPostAction from "../pages/new-post/new-post.action";
import newPostLoader from "../pages/new-post/new-post.loader";
import NotFound from "../pages/not-found/not-found";
import SignUp from "../pages/signup/signup";
import signUpAction from "../pages/signup/signup.action";
import UserRedirect from "../pages/user-redirect/user-redirect";
import userRedirectLoader from "../pages/user-redirect/user-redirect.loader";
import UserUpgrade from "../pages/user-upgrade/user-upgrade";
import userUpgradeAction from "../pages/user-upgrade/user-upgrade.action";
import userUpgradeLoader from "../pages/user-upgrade/user-upgrade.loader";
import paths from "./paths";

const routes = [
  {
    path: paths.home.path,
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    loader: layoutLoader,
    shouldRevalidate: () => true,
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
        action: blogPostAction,
      },
      {
        path: paths.newBlogPost.path,
        element: <NewPost />,
        loader: newPostLoader,
        action: newPostAction,
      },
      {
        path: paths.editBlogPost.path,
        element: <EditPost />,
        loader: editPostLoader,
        action: editPostAction,
      },
    ],
  },
  {
    path: paths.login.path,
    element: <Login />,
    errorElement: <ErrorBoundary />,
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: paths.signup.path,
    element: <SignUp />,
    errorElement: <ErrorBoundary />,
    loader: loginLoader,
    action: signUpAction,
  },
  {
    path: paths.userRedirect.path,
    element: <UserRedirect />,
    loader: userRedirectLoader,
    errorElement: <ErrorBoundary />,
  },
  {
    path: paths.userUpgrade.path,
    element: <UserUpgrade />,
    loader: userUpgradeLoader,
    action: userUpgradeAction,
    errorElement: <ErrorBoundary />,
  },
  {
    path: paths.notFound.path,
    element: <NotFound />,
  },
];

export default routes;
