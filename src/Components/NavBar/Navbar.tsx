import { Link } from "@tanstack/react-router";
import { useAPI } from "../../Providers/APIProvider";

const Navbar = () => {
  const { logout } = useAPI();
  return (
    <aside>
      <div className=" p-2 min-h-screen h-full border-r-2 border-sun align-center flex flex-col gap-2 text-lg  w-[200px]">
        <div className="sticky top-4">
          <div>
            <div className="w-full">
              <img
                className="w-full"
                src="src/assets/Gw2_taskmaster.png"
                alt="TaskMaster Logo"
              />
            </div>
          </div>
          <div className="flex flex-col   gap-4 items-center">
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
