import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router";
import MobileNav from "./MobileNav";
import { FaShoppingBag } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

const Navbar = () => {
  const { userId, logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="bg-blue-800 sticky top-0 z-50 ">
      <div className="container mx-auto max-w-7xl flex justify-between items-center p-2 h-15">
        <a
          className="flex items-center text-white hover:cursor-pointer"
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          <FaShoppingBag className="text-xl "></FaShoppingBag>
          <span className="ml-3 text-xl font-semibold">MarketPlace</span>
        </a>

        <div className="md:flex items-center gap-4 hidden">
          <button
            onClick={() => {
              navigate("/post");
            }}
            className="flex items-center gap-1  font-semibold bg-none text-white hover:text-gray-300  transition-all hover:cursor-pointer"
          >
            <FaShoppingBag className="text-md" /> Sell Item
          </button>
          <div
            className="hover:cursor-pointer"
            onClick={() => {
              navigate(`/users/me`);
            }}
          >
            <img
              className="h-7 w-7 rounded-full object-cover "
              src={
                "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="profile pic"
            />
          </div>
          <button
            className="flex items-center gap-1.5 bg-none font-semibold text-white hover:text-gray-300 rounded  hover:cursor-pointer"
            onClick={handleLogout}
          >
            Logout <IoMdExit className="text-lg" />
          </button>
        </div>
        <MobileNav></MobileNav>
      </div>
    </header>
  );
};

export default Navbar;
