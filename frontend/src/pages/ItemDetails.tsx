import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import useItemStore from "../store/useItemStore";
import { useEffect } from "react";
import { FaLink } from "react-icons/fa";
import SyncLoader from "react-spinners/SyncLoader";

const ItemDetails = () => {
  const { currentItem, setCurrentItem, setLoading, isLoading } = useItemStore();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setCurrentItem(id);
  }, [id]);

  if (isLoading || !currentItem) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <SyncLoader color="#2563EB" loading={isLoading} size={30} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="text-gray-800 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap bg-white shadow-md rounded-lg p-6">
            {/* Left: Item Image */}
            <div className="lg:w-1/2 w-full p-4">
              <img
                alt="Item"
                className="lg:w-full w-full h-96 object-cover rounded-lg shadow-md"
                src={currentItem.imgUrl}
              />
            </div>

            {/* Right: Item Details */}
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6">
              {/* Item Name */}
              <h1 className="text-gray-900 text-3xl font-bold mb-2">
                {currentItem.name}
              </h1>

              {/* Item Price */}
              <p className="text-2xl font-semibold text-blue-600 mt-2">
                ₹ {currentItem.price}
              </p>

              {/* Item Info (Category & Condition) */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4 text-gray-700">
                <div className="bg-gray-100 px-3 py-2 rounded-md">
                  <span className="font-medium">Category:</span>{" "}
                  {currentItem.category}
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-md">
                  <span className="font-medium">Condition:</span>{" "}
                  {currentItem.condition}
                </div>
              </div>

              {/* Description */}
              <p className="leading-relaxed mt-6 text-gray-700">
                {currentItem.description}
              </p>

              {/* Seller Information */}
              <p
                className="text-lg mt-8 flex items-center gap-1 font-medium text-gray-900 hover:cursor-pointer hover:underline"
                onClick={() => navigate(`/users/${currentItem.sellerId._id}`)}
              >
                Seller: {currentItem.sellerId.name}{" "}
                <FaLink className="inline-block text-sm text-blue-800" />
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition shadow"
                  onClick={() => navigate(`/users/${currentItem.sellerId._id}`)}
                >
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemDetails;
