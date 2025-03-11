import UserCard from "../components/UserCard";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";

const item = {
  name: "Book",
  description: "This is a book",
  price: 20,
  imageUrl: "https://via.placeholder.com/150",
};

const itemList = Array.from({ length: 8 }, () => ({ ...item }));

const UserProfile = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 gap-10 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1 col-span-2">
          <UserCard />
        </div>

        <div className="md:col-span-2 border border-gray-200 rounded-lg p-6 shadow-md">
          <h1 className="text-xl font-bold p-4">Items</h1>
          <hr className="border border-gray-200" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6">
            {itemList.map((item) => (
              <ItemCard
                key={item.name} // Key for React optimization
                name={item.name}
                description={item.description}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
