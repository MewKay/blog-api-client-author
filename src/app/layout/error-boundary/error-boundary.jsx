import NetworkError from "@/lib/errors/network.error";
import ServerError from "@/lib/errors/server.error";
import PropTypes from "prop-types";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorLayout = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <main>
      <h3>{title}</h3>
      {children}
      <div>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    </main>
  );
};

ErrorLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const ErrorBoundary = () => {
  const error = useRouteError();

  if (error instanceof NetworkError) {
    return (
      <ErrorLayout title="Connection issue">
        We are unable to connect to ours servers. Please check your internet
        connection and try again.
      </ErrorLayout>
    );
  }

  if (error instanceof ServerError) {
    return (
      <ErrorLayout title="Server Temporarily Unavailable">
        Server is experiencing some technical difficulties. Please try again in
        a few minutes
      </ErrorLayout>
    );
  }

  return (
    <ErrorLayout title="Something went wrong.">
      We encountered an unexpected error while processing your request. Please
      try again in a few minutes.
    </ErrorLayout>
  );
};

export default ErrorBoundary;
