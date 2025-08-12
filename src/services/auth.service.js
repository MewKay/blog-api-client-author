import api from "./api-client";

const authService = {
  login: async (credentials) => {
    const response = await api.post("/login", credentials);

    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("token", response.token);
    window.dispatchEvent(new Event("storage"));

    return response;
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
  },
  signup: (body) => api.post("/signup", body),
  getUser: () => JSON.parse(localStorage.getItem("user")),
  getToken: () => localStorage.getItem("token"),
};

export default authService;
