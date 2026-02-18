import PropTypes from "prop-types";
import NavigationStatus from "@/components/navigation-status/navigation-status";
import GuestLimitModal from "@/features/guest-limit-modal/guest-limit-modal";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "@/services/auth.service";
import paths from "@/app/routes/paths";
import styles from "./header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const { user } = authService.getAuthData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logout = () => {
    authService.logout();
    navigate(paths.login.path);
  };

  return (
    <>
      <header>
        <div className={styles.headerContainer}>
          <div className={styles.contentContainer}>
            {user.is_guest && (
              <button
                className={styles.guestButton}
                onClick={() => setIsModalOpen(true)}
              >
                Guest mode
              </button>
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
      <GuestLimitModal
        user={user}
        isOpen={isModalOpen}
        onVisibilityChange={setIsModalOpen}
      />
    </>
  );
};

Header.propTypes = {
  isUserGuest: PropTypes.bool,
};

export default Header;
