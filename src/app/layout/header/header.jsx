import paths from "@/app/routes/paths";
import authService from "@/services/auth.service";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate(paths.login.path);
  };

  return (
    <header>
      <button onClick={logout}>Log out</button>
    </header>
  );
};

export default Header;
