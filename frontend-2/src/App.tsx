import { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "./components/ItemCard";
import Navbar from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";

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
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("/api/items");
        console.log("Items from server:", response.data.items);
        setItems(response.data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const notify = () => toast.success("Clicked");

  return (
    <>
      <div>
        <div>
          <Toaster></Toaster>
        </div>
        <Navbar />
        <div className="p-5 flex justify-center">
          <div className="w-full max-w-7xl">
            <div
              onClick={notify}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {items.map((item) => (
                <ItemCard
                  key={item._id}
                  _id={item._id}
                  name={item.name}
                  price={item.price}
                  imgUrl={item.imgUrl}
                  sellerId={item.sellerId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
