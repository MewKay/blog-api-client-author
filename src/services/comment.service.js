import api from "./api-client";

const commentService = {
  getAllByPostId: (postId) => api.get(`/posts/${postId}/comments`),
};

export default commentService;
