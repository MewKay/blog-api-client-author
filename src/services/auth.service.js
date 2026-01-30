import api from "./api-client";
import decodeTokenToUser from "@/lib/decodeTokenToUser";

const removeAuth = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("storage"));
};

const authService = {
  login: async (credentials) => {
    const response = await api.post("/login", credentials);

    localStorage.setItem("token", response.token);
    window.dispatchEvent(new Event("storage"));

    return response;
  },
  logout: removeAuth,
  signup: (body) => api.post("/signup-author", body),
  signGuest: async () => {
    const response = await api.post("/guest-author");

    localStorage.setItem("token", response.token);
    window.dispatchEvent(new Event("storage"));

    return response;
  },
  getAuthData: () => {
    const token = localStorage.getItem("token");
    const user = decodeTokenToUser(token);

    if (!user) {
      if (token) {
        removeAuth();
      }

      return false;
    }

    return { user, token };
  },
};

export default authService;
