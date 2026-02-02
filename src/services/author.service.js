import api from "./api-client";

const authorService = {
  getLimitStatus: (authorId, token) =>
    api.get(`/authors/${authorId}/limit-status`, token),
};

export default authorService;
