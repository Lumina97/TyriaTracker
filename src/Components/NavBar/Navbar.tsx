import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <aside className="bg-gray-800 text-white sm:min-h-screen sm:w-[200px] border-r-2 border-sun">
      <div className="p-4 flex flex-col items-center gap-4 sticky top-4">
        <div className="w-full max-w-[190px]">
          <Link to="/tasks">
            <img
              className="w-full"
              src="/assets/Gw2_taskmaster.png"
              alt="TaskMaster Logo"
            />
          </Link>
        </div>
        <nav className="flex flex-col gap-4 items-center w-full">
          <Link to="/tasks" className="hover:scale-110 font-semibold">
            Tasks
          </Link>
          <Link to="/tradingPost" className="hover:scale-110 font-semibold">
            TradingPost
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;
