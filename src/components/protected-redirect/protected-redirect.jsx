import ROUTES_PATH from "@/app/routes/path";
import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRedirect = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES_PATH.login} />;
  }

  return children;
};

ProtectedRedirect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRedirect;
