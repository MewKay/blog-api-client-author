const paths = {
  home: {
    path: "/",
  },
  login: {
    path: "/log-in",
  },
  signup: {
    path: "/sign-up",
  },
  blogPost: {
    path: "/posts/:encodedId/:slug",
    getHref: (encodedId, slug) => `/posts/${encodedId}/${slug}`,
  },
  editBlogPost: {
    path: "/posts/edit/:encodedId/:slug",
    getHref: (encodedId, slug) => `/posts/edit/${encodedId}/${slug}`,
  },
  newBlogPost: {
    path: "/posts/new",
  },
  deleteComment: {
    path: "/posts/:encodedId/:slug/:commentId/delete",
    getHref: (encodedId, slug, commentId) =>
      `/posts/${encodedId}/${slug}/${commentId}/delete`,
  },
  userRedirect: {
    path: "/user-redirect",
  },
};

export default paths;
