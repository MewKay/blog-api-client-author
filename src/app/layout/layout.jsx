import { Outlet, useLoaderData } from "react-router-dom";
import Header from "./header/header";

const Layout = () => {
  const loaderData = useLoaderData();

  return (
    <>
      <Header isUserGuest={loaderData.user.is_guest} />
      <Outlet context={{ ...loaderData }} />
    </>
  );
};

export default Layout;
