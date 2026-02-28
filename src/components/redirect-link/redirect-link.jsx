import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ChevronRight } from "lucide-react";

const RedirectLink = ({
  children,
  isRouterLink = true,
  path,
  ...linkProps
}) => {
  return isRouterLink ? (
    <Link {...linkProps} to={path}>
      {children}
      <ChevronRight />
    </Link>
  ) : (
    <a {...linkProps} href={path}>
      {children}
      <ChevronRight />
    </a>
  );
};

RedirectLink.propTypes = {
  children: PropTypes.node,
  isRouterLink: PropTypes.bool,
  path: PropTypes.string.isRequired,
};

export default RedirectLink;
