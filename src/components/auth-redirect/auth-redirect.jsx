import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return children;
};

AuthRedirect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRedirect;
