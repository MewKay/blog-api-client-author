import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRedirect = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={"/log-in"} />;
  }

  return children;
};

ProtectedRedirect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRedirect;
