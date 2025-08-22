import api from "./api-client";

const postService = {
  getAuthorPosts: (authorId, token) =>
    api.get(`/authors/${authorId}/posts`, token),
  getAuthorPost: ({ authorId, postId }, token) =>
    api.get(`/authors/${authorId}/posts/${postId}`, token),
};

export default postService;
