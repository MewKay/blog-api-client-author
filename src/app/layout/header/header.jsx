import PropTypes from "prop-types";
import NavigationStatus from "@/components/navigation-status/navigation-status";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import authService from "@/services/auth.service";
import paths from "@/app/routes/paths";
import styles from "./header.module.css";

const Header = ({ isUserGuest = false }) => {
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate(paths.login.path);
  };

  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.contentContainer}>
          {isUserGuest && (
            <button className={styles.guestButton}>Guest mode</button>
          )}
          <button
            className={styles.logOutButton}
            onClick={logout}
            aria-label="Log out"
          >
            <LogOut />
          </button>
        </div>
        <NavigationStatus />
      </div>
    </header>
  );
};

Header.propTypes = {
  isUserGuest: PropTypes.bool,
};

export default Header;
