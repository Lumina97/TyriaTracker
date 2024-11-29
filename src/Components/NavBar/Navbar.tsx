import { Link } from "@tanstack/react-router";
import { useAPI } from "../../Providers/APIProvider";

const Navbar = () => {
  const { logout } = useAPI();
  return (
    <aside>
      <div className="p-2 w-full items-center  sm:min-h-screen sm:h-full sm:border-r-2 pb-8 sm:pb-0  border-sun align-center flex flex-col gap-2 text-lg  sm:w-[200px]">
        <div className="sticky top-4 flex flex-col">
          <div className="w-full max-w-[190px] self-center ">
            <img
              className="w-full"
              src="assets/Gw2_taskmaster.png"
              alt="TaskMaster Logo"
            />
          </div>
          <div className="flex  flex-row sm:flex-col   gap-4 items-center">
            <Link to="/Home" className="hover:scale-[1.1] font-semibold">
              Tasks
            </Link>
            <Link to="/Account" className="hover:scale-[1.1] font-semibold">
              Account
            </Link>
            <a
              className="hover:scale-[1.1] font-semibold cursor-pointer"
              onClick={logout}
            >
              Log Out
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
