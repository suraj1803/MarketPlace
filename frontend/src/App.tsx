import { useEffect } from "react";
import ItemCard from "./components/ItemCard";
import Navbar from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import useItemStore from "./store/useItemStore";

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
  //const [items, setItems] = useState<Item[]>([]);

  const { items, fetchItems, isLoading, error } = useItemStore();

  useEffect(() => {
    fetchItems();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

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
