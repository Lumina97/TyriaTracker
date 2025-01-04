import { Link } from "@tanstack/react-router";
import { useAPI } from "../../Providers/APIProvider";

const Navbar = () => {
  const { logout } = useAPI();
  return (
    <aside className="bg-gray-800 text-white sm:min-h-screen sm:w-[200px] border-r-2 border-sun">
      <div className="p-4 flex flex-col items-center gap-4 sticky top-4">
        <div className="w-full max-w-[190px]">
          <Link to="/Tasks">
            <img
              className="w-full"
              src="/assets/Gw2_taskmaster.png"
              alt="TaskMaster Logo"
            />
          </Link>
        </div>
        <nav className="flex flex-col gap-4 items-center w-full">
          <Link to="/Tasks" className="hover:scale-110 font-semibold">
            Tasks
          </Link>
          <Link to="/Account" className="hover:scale-110 font-semibold">
            Account
          </Link>
          <Link to="/TradingPost" className="hover:scale-110 font-semibold">
            TradingPost
          </Link>
          <a
            className="hover:scale-110 font-semibold cursor-pointer"
            onClick={logout}
          >
            Log Out
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;
