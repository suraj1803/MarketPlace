import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import useItemStore from "../store/useItemStore";
import { useEffect } from "react";

const ItemDetails = () => {
  const { currentItem, setCurrentItem } = useItemStore();
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

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900 mt-8">
                  ₹ {currentItem?.price}
                </span>
                <button className="flex ml-auto text-white mt-8 bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-500 rounded">
                  Contact With Seller
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
