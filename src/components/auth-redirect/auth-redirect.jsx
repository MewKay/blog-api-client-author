import ROUTES_PATH from "@/app/routes/path";
import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES_PATH.home} />;
  }

  return children;
};

AuthRedirect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRedirect;
