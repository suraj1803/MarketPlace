import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { TiThMenu } from "react-icons/ti";
import { FaPlus, FaShoppingBag } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white hover:cursor-pointer"
      >
        <TiThMenu className="text-xl"></TiThMenu>
      </button>

      {/* Side Navigation */}
      <div
        className={`fixed top-0 right-0 h-full w-50 bg-blue-800 shadow-lg transform transition-transform duration-300 p-8 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 left-4"
        >
          ✖
        </button>
        <nav className="flex flex-col gap-4 mt-10">
          <button
            onClick={() => {
              navigate("/post");
              setIsOpen(false);
            }}
            className="flex items-center gap-1  font-semibold bg-none text-white hover:text-gray-300  transition-all hover:cursor-pointer"
          >
            <FaShoppingBag className="text-md" /> Sell Item
          </button>

          <button
            className="flex items-center gap-1.5 bg-none font-semibold text-white hover:text-gray-300 rounded  hover:cursor-pointer"
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
          >
            Logout <IoMdExit className="text-lg" />
          </button>
        </nav>
      </div>
    </>
  );
}
