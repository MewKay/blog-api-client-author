import api from "./api-client";

const commentService = {
  getAllByPostId: (postId) => api.get(`/posts/${postId}/comments`),
  deleteOne: (postId, commentId) =>
    api.delete(`/posts/${postId}/comments/${commentId}`),
};

export default commentService;
