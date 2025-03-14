import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";
import { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  _id: number;
  name: string;
  description: string;
  price: number;
  sellerId: string;
  category: string;
  condition: string;
  imgUrl: string;
}

const App = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("/api/items");
        console.log("Items from server:", response.data.data);
        setItems(response.data.data);
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
    <div className="m-2">
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
      <div>
        {items.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-2 gap-2 text-md font-semibold text-blue-600 mb-8"
          >
            <div className="flex gap-2  items-center">
              <span>{items.indexOf(item) + 1}</span>
              <span>{item.name}</span>
            </div>
            <div className="w-20 h-20">
              <img src={item.imgUrl} alt="image" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
