import api from "./api-client";

const postService = {
  getAuthorPosts: (authorId, authToken) =>
    api.get(`/authors/${authorId}/posts`, authToken),
};

export default postService;
