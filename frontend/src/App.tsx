import { useEffect } from "react";
import ItemCard from "./components/ItemCard";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useItemStore from "./store/useItemStore";
import SyncLoader from "react-spinners/SyncLoader";

export interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  sellerId: any;
  category: string;
  condition: string;
  imgUrl: string;
  sellerName: string;
}

const App = () => {
  const { items, fetchItems, isLoading, error } = useItemStore();

  useEffect(() => {
    fetchItems();
  }, [items.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <SyncLoader color="#2563EB" loading={isLoading} size={30} />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <div>
          <Toaster></Toaster>
        </div>
        <Navbar />
        <div className="p-5 flex justify-center">
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <ItemCard item={item} key={item._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
