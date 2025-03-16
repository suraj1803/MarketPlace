import { Link } from "react-router";

interface Props {
  _id: string;
  name: string;
  //description: string;
  price: number;
  imgUrl: string;
  sellerId: string;
}

const ItemCard = ({ _id, name, price, imgUrl }: Props) => {
  return (
    <div className="bg-white rounded-lg p-3 border border-gray-300 transition-all hover:shadow-lg hover:cursor-pointer">
      {/* Product Image */}
      <div className="h-44 bg-gray-50 mb-3 rounded overflow-hidden">
        <img src={imgUrl} alt={name} className="w-full h-full object-contain" />
      </div>

      {/* Product Details */}
      <p className="text-xl font-bold">₹ {price.toLocaleString()}</p>

      <h3 className="truncate mb-2">{name}</h3>
      <Link to={`/items/${_id}`} className="text-blue-600 hover:underline">
        View Details →
      </Link>
    </div>
  );
};

export default ItemCard;
