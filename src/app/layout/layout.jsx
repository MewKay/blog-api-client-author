import { Outlet } from "react-router-dom";
import Header from "./header/header";
import ProtectedRedirect from "@/components/protected-redirect/protected-redirect";

const Layout = () => {
  return (
    <ProtectedRedirect>
      <Header />
      <Outlet />
    </ProtectedRedirect>
  );
};

export default Layout;
