import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import Header from "./header/header";
import authService from "@/services/auth.service";
import paths from "../routes/paths";

const Layout = () => {
  const loaderData = useLoaderData();
  const authData = authService.getAuthData();

  return !authData ? (
    <Navigate to={paths.login.path} />
  ) : (
    <>
      <Header />
      <Outlet context={{ ...loaderData }} />
    </>
  );
};

export default Layout;
