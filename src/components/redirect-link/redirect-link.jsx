import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ChevronRight } from "lucide-react";
import styles from "./redirect-link.module.css";

const RedirectLink = ({
  children,
  isRouterLink = true,
  path,
  colorscheme = "light",
  ...linkProps
}) => {
  const colorschemeClassname =
    colorscheme !== "light" ? styles.dark : styles.light;

  return (
    <li className={`${styles.container} ${colorschemeClassname}`}>
      {isRouterLink ? (
        <Link {...linkProps} className={styles.link} to={path}>
          {children}
          <ChevronRight />
        </Link>
      ) : (
        <a {...linkProps} className={styles.link} href={path}>
          {children}
          <ChevronRight />
        </a>
      )}
    </li>
  );
};

RedirectLink.propTypes = {
  children: PropTypes.node,
  isRouterLink: PropTypes.bool,
  path: PropTypes.string.isRequired,
  colorscheme: PropTypes.string,
};

export default RedirectLink;
