import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { TiThMenu } from "react-icons/ti";

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
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 p-8 ${
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
            className="py-2 px-4 text-white font-semibold bg-blue-600 rounded shadow-md hover:bg-gray-200 transition-all hover:cursor-pointer"
          >
            ➕ Sell Item
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="py-2 px-4 bg-red-600 text-white rounded shadow hover:bg-red-700"
          >
            Logout
          </button>
        </nav>
      </div>
    </>
  );
}
