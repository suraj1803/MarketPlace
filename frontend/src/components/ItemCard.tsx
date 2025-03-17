import { Link } from "react-router";
import { Item } from "../App";
import useItemStore from "../store/useItemStore";

interface Props {
  item: Item;
}

const ItemCard = ({ item }: Props) => {
  const { setCurrentItem } = useItemStore();

  return (
    <div className="bg-white rounded-lg p-3 border border-gray-300 transition-all hover:shadow-lg hover:cursor-pointer">
      <Link to={`/items/${item._id}`}>
        {/* Product Image */}
        <div className="h-44 bg-gray-50 mb-3 rounded overflow-hidden">
          <img
            src={item.imgUrl}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Details */}
        <p className="text-xl font-bold">₹ {item.price.toLocaleString()}</p>

        <h3 className="truncate mb-2">{item.name}</h3>
        <Link
          to={`/items/${item._id}`}
          className="text-blue-600 hover:underline"
          onClick={() => setCurrentItem(item._id)}
        >
          View Details&rarr;
        </Link>
      </Link>
    </div>
  );
};

export default ItemCard;
