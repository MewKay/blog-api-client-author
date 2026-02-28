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
    localStorage.setItem("guest_sign_before", "false");
    window.dispatchEvent(new Event("storage"));

    return response;
  },
  upgradeUser: async (authorPassword, token) => {
    const response = await api.post("/upgrade-user", authorPassword, token);

    localStorage.setItem("token", response.token);
    window.dispatchEvent(new Event("storage"));

    return response;
  },
  markGuestSigned: () => {
    localStorage.setItem("guest_sign_before", "true");
    window.dispatchEvent(new Event("storage"));
  },
  getAuthData: () => {
    const token = localStorage.getItem("token");
    const hasGuestSignedBefore =
      localStorage.getItem("guest_sign_before") === "true";
    const user = decodeTokenToUser(token);

    if (!user) {
      if (token) {
        removeAuth();
      }

      return false;
    }

    return { user: { ...user, hasGuestSignedBefore }, token };
  },
};

export default authService;
