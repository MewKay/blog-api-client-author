import Layout from "../layout/layout";
import BlogPost from "../pages/blog-post/blog-post";
import blogPostLoader from "../pages/blog-post/blog-post.loader";
import deleteCommentAction from "../pages/delete-comment/delete-comment.action";
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
        path: paths.newBlogPost.path,
        element: <NewPost />,
        action: newPostAction,
      },
      {
        path: paths.editBlogPost.path,
        element: <EditPost />,
        loader: editPostLoader,
        action: editPostAction,
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
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: paths.signup.path,
    element: <SignUp />,
    loader: loginLoader,
    action: signUpAction,
  },
  {
    path: paths.userRedirect.path,
    element: <UserRedirect />,
  },
];

export default routes;
