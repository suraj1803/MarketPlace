import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router";
import MobileNav from "./MobileNav";
import { FaPlusCircle, FaArrowRight } from "react-icons/fa";

const Navbar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="bg-blue-700 sticky top-0 z-50 ">
      <div className="container mx-auto max-w-8xl flex justify-between items-center p-2 h-15">
        <a className="flex items-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">MarketPlace</span>
        </a>

        <div className="md:flex items-center gap-4 hidden">
          <button
            onClick={() => {
              navigate("/post");
            }}
            className="flex items-center gap-2  py-1 px-3  font-semibold bg-white rounded  shadow-md hover:bg-gray-200 transition-all hover:cursor-pointer"
          >
            <FaPlusCircle className="" /> Sell Item
          </button>
          <button
            className="flex items-center gap-1.5 bg-red-600 font-semibold text-white hover:bg-red-400 py-1 px-3 rounded"
            onClick={handleLogout}
          >
            Logout <FaArrowRight className="text-sm" />
          </button>
        </div>
        <MobileNav></MobileNav>
      </div>
    </header>
  );
};

export default Navbar;
