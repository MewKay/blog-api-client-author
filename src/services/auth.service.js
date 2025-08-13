import api from "./api-client";

const authService = {
  login: async (credentials) => {
    const response = await api.post("/login", credentials);

    localStorage.setItem("thyblog_user", JSON.stringify(response.user));
    localStorage.setItem("thyblog_token", response.token);
    window.dispatchEvent(new Event("storage"));

    return response;
  },
  logout: () => {
    localStorage.removeItem("thyblog_user");
    localStorage.removeItem("thyblog_token");
    window.dispatchEvent(new Event("storage"));
  },
  signup: (body) => api.post("/signup-author", body),
  getUser: () => JSON.parse(localStorage.getItem("thyblog_user")),
  getToken: () => localStorage.getItem("thyblog_token"),
};

export default authService;
