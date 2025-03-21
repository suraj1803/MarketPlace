import { useEffect, useState } from "react";
import ItemCard from "./components/ItemCard";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useItemStore from "./store/useItemStore";
import SyncLoader from "react-spinners/SyncLoader";
import useAuthStore from "./store/useAuthStore";
import api from "./utils/api";
import axios from "axios";
import FilterDropdown from "./components/FilterButton";

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
  const {
    items,
    fetchItems,
    fetchItemsByCategory,
    isLoading,
    error,
    selectedCategoryId,
  } = useItemStore();
  const { userId } = useAuthStore();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchItems();
        const res = await axios.get(`/api/users/${userId}`);
        setUser(res.data.user);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    try {
      if (selectedCategoryId) fetchItemsByCategory();
    } catch (error) {}
  }, [selectedCategoryId]);

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
            <div className="mb-5">
              <FilterDropdown />
            </div>
            {items.length === 0 ? (
              <div className="text-center text-2xl">No items found</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((item) => {
                  return <ItemCard key={item._id + 1} item={item} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
