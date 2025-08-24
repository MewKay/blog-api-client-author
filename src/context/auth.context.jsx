import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import authService from "@/services/auth.service";

const AuthContext = createContext({
  user: {
    id: null,
    username: null,
    is_author: null,
  },
  logout: () => {},
  isAuthenticated: false,
});

const AuthProvider = ({ children }) => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const updateAuthor = () => {
      const authData = authService.getAuthData();

      if (authData && !authData.user.is_author) {
        return;
      }

      setAuthor(authData.user);
    };

    updateAuthor();

    window.addEventListener("storage", updateAuthor);
  }, []);

  const logout = () => {
    authService.logout();
    setAuthor(null);
  };

  const isAuthenticated = author ? true : false;

  return (
    <AuthContext.Provider value={{ author, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
