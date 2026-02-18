import { Outlet, useLoaderData } from "react-router-dom";
import Header from "./header/header";

const Layout = () => {
  const loaderData = useLoaderData();

  return (
    <>
      <Header />
      <Outlet context={{ ...loaderData }} />
    </>
  );
};

export default Layout;
