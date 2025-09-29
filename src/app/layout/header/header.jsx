import paths from "@/app/routes/paths";
import authService from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import styles from "./header.module.css";
import NavigationStatus from "@/components/navigation-status/navigation-status";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate(paths.login.path);
  };

  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.contentContainer}>
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

export default Header;
