import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import useItemStore from "../store/useItemStore";
import { useEffect } from "react";
import { FaLink } from "react-icons/fa";

const ItemDetails = () => {
  const { currentItem, setCurrentItem } = useItemStore();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setCurrentItem(id);
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-150 h-64 object-contain  rounded"
              src={currentItem?.imgUrl}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mt-4 mb-1">
                {currentItem?.name}
              </h1>

              <p className="leading-relaxed mt-4">{currentItem?.description}</p>

              <p className="title-font font-medium text-3xl text-gray-900 mt-8">
                ₹ {currentItem?.price}
              </p>
              <p
                className="text-xl mt-8 flex items-center gap-1 font-medium text-gray-900 hover:cursor-pointer hover:underline"
                onClick={() => {
                  navigate(`/users/${currentItem?.sellerId._id}`);
                }}
              >
                Seller: {currentItem?.sellerId.name}{" "}
                <FaLink className="inline-block text-sm text-blue-800"></FaLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemDetails;
