import api from "./api-client";

const commentService = {
  getAllByPostId: (postId) => api.get(`/posts/${postId}/comments`),
  deleteOne: ({ postId, commentId }, token) =>
    api.delete(`/posts/${postId}/comments/${commentId}`, token),
};

export default commentService;
