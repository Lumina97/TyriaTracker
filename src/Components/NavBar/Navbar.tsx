import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <aside
      data-testid="navbar"
      className="bg-gray-800 text-white sm:min-h-screen sm:w-[200px] border-r-2 border-sun"
    >
      <nav className="p-4 flex flex-col items-center gap-4 sticky top-4">
        <div className="w-full max-w-[190px]">
          <Link data-testid="navLink1" to="/tasks">
            <img
              className="w-full"
              src="/assets/Gw2_taskmaster.png"
              alt="TaskMaster Logo"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-4 items-center w-full">
          <Link
            data-testid="navLink2"
            to="/tasks"
            className="hover:scale-110 font-semibold"
          >
            Tasks
          </Link>
          <Link
            data-testid="navLink3"
            to="/tradingPost"
            className="hover:scale-110 font-semibold"
          >
            TradingPost
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
