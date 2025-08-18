import useAuth from "@/hooks/useAuth";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header>
      <button onClick={logout}>Log out</button>
    </header>
  );
};

export default Header;
