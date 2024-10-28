import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <nav>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{" "}
        <Link
          to="/SignIn"
          activeProps={{
            className: "font-bold",
          }}
        >
          Sign In
        </Link>
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;
