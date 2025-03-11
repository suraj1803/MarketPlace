import UserLogo from "../assets/profile.png";
interface Props {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

const ItemCard = ({ name, description, price, imageUrl }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-t-lg">
        <img src={UserLogo} className="w-full h-full object-contain" />
      </div>

      <div className="p-3">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-blue-600 font-bold text-md">${price}</p>

        <div className="flex justify-between text-gray-500 text-sm mt-2">
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
