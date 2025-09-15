import paths from "@/app/routes/paths";
import authService from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import styles from "./header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate(paths.login.path);
  };

  return (
    <header>
      <button
        className={styles.logOutButton}
        onClick={logout}
        aria-label="Log out"
      >
        <LogOut />
      </button>
    </header>
  );
};

export default Header;
