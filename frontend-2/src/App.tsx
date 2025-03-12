import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("/api/items");
        console.log("Items from server:", response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="text-teal-500 m-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">DashBoard</h1>
        <div>
          <Link
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors"
            to="/post"
          >
            Post
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default App;
