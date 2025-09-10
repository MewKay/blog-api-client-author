import paths from "@/app/routes/paths";
import authService from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate(paths.login.path);
  };

  return (
    <header>
      <button className={styles.logOutButton} onClick={logout}>
        Log out
      </button>
    </header>
  );
};

export default Header;
