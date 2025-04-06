import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router";
import MobileNav from "./MobileNav";
import { FaShoppingBag } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { useState } from "react";
import useItemStore from "../store/useItemStore";

const Navbar = () => {
  const { userId, logout, user } = useAuthStore();
  const { setSelectedQuery, reset } = useItemStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedQuery(search);
    navigate("/");
  };

  return (
    <header className="bg-blue-800 sticky top-0 z-50 ">
      <div className="container mx-auto max-w-7xl flex justify-between items-center p-2 h-15">
        <a
          className="flex items-center text-white hover:cursor-pointer"
          onClick={() => {
            reset();
            navigate("/");
          }}
        >
          <FaShoppingBag className="text-xl "></FaShoppingBag>
          <span className="ml-3 text-xl font-semibold">MarketPlace</span>
        </a>

        <form onSubmit={handleSearch} className="flex-1 mx-10">
          <input
            type="text"
            className="w-full p-2 rounded-lg border  border-white text-white  focus:outline-none  "
            placeholder="Search for items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="md:flex items-center gap-4 hidden">
          <button
            onClick={() => {
              navigate("/post");
            }}
            className="flex items-center gap-1 font-semibold bg-none text-white hover:text-gray-300 transition-all hover:cursor-pointer"
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
              className="h-7 w-7 rounded-full object-cover"
              src={user?.imgUrl}
              alt="profile pic"
            />
          </div>
          <button
            className="flex items-center gap-1.5 bg-none font-semibold text-white hover:text-gray-300 rounded hover:cursor-pointer"
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
