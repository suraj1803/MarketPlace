import { Link, useNavigate } from "react-router-dom";
import { Item } from "../App";
import useItemStore from "../store/useItemStore";
import { useState } from "react";

interface Props {
  item: Item;
  onDelete: (id: string) => void;
}

const ProfileItemCard = ({ item, onDelete }: Props) => {
  const { setCurrentItem, deleteItem } = useItemStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    setLoading(true);

    const token = localStorage.getItem("token"); // Assuming token is stored
    if (!token) {
      alert("Not authenticated!");
      setLoading(false);
      return;
    }

    try {
      await deleteItem(item._id, token);
      onDelete(item._id);
    } catch (err) {
      alert("Error deleting item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative bg-white rounded-lg p-3 border border-gray-300 transition-all hover:shadow-lg hover:cursor-pointer"
      onClick={() => {
        setCurrentItem(item._id);
        navigate(`/items/${item._id}`);
      }}
    >
      {/* Delete Button */}
      <button
        className="absolute top-2 right-2 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
        onClick={handleDelete}
        disabled={loading}
      >
        ✖
      </button>

      {/* Product Image */}
      <div className="h-44 bg-gray-50 mb-3 rounded overflow-hidden">
        <img
          src={item.imgUrl}
          alt={item.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <p className="text-xl font-bold">₹ {item.price}</p>

      <h3 className="truncate mb-2">{item.name}</h3>
      <Link
        to={`/items/${item._id}`}
        className="text-blue-600 hover:underline"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentItem(item._id);
        }}
      >
        View Details&rarr;
      </Link>
    </div>
  );
};

export default ProfileItemCard;
