import UserLogo from "../assets/profile.png";
import SellInfo from "./SellInfo";

const UserCard = () => {
  return (
    <div className="bg-white shadow-md border border-gray-100 rounded-lg p-8">
      <div>
        <div className="flex flex-col items-center">
          <div>
            <img src={UserLogo} className="w-40 h-40 rounded-full mx-auto " />
          </div>

          <div className="text-center mt-4 mb-4">
            <p className="text-2xl font-semibold text-gray-800">Suraj Biswas</p>
          </div>

          <div className="grid grid-cols-2 gap-5 mb-4">
            {[
              { info: "Items Sold", value: "20" },
              { info: "Followers", value: "1.2k" },
            ].map((item, index) => (
              <SellInfo key={index} info={item.info} value={item.value} />
            ))}
          </div>

          <div>
            <button className="bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full">
              Follow
            </button>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xl font-semibold">Contact</p>
          <hr className="border-t border-gray-300 my-4" />
          <p className="p-2">📍 Btech IT </p>
          <p className="p-2">☎️ 6294365924</p>
          <p className="p-2">🌐 www.surajbiswas.com </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
