import api from "./api-client";

const postService = {
  getAuthorPosts: (authorId, token) =>
    api.get(`/authors/${authorId}/posts`, token),
  getAuthorPost: ({ authorId, postId }, token) =>
    api.get(`/authors/${authorId}/posts/${postId}`, token),
  createPost: (body, token) => api.post(`/posts`, body, token),
  updatePost: (postId, body, token) => api.put(`/posts/${postId}`, body, token),
  deletePost: (postId, token) => api.delete(`/posts/${postId}`, token),
};

export default postService;
