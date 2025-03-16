import ItemCard from "./ItemCard";

interface Item {
  //_id: string;
  name: string;
  //description: string;
  price: number;
  imgUrl: string;
  //sellerId: string;
}

const ItemGrid = () => {
  const items: Item[] = [
    {
      name: "C++ Book",
      price: 200,
      imgUrl:
        "https://res.cloudinary.com/dvhxhzwum/image/upload/v1741980840/uploads/djlubfbgab1au1bh3jxk.jpg",
    },
    {
      name: "C++ Book",
      price: 200,
      imgUrl:
        "https://res.cloudinary.com/dvhxhzwum/image/upload/v1741980840/uploads/djlubfbgab1au1bh3jxk.jpg",
    },
    {
      name: "C++ Book",
      price: 200,
      imgUrl:
        "https://res.cloudinary.com/dvhxhzwum/image/upload/v1741980840/uploads/djlubfbgab1au1bh3jxk.jpg",
    },
    {
      name: "C++ Book",
      price: 200,
      imgUrl:
        "https://res.cloudinary.com/dvhxhzwum/image/upload/v1741980840/uploads/djlubfbgab1au1bh3jxk.jpg",
    },
    {
      name: "C++ Book",
      price: 200,
      imgUrl:
        "https://res.cloudinary.com/dvhxhzwum/image/upload/v1741980840/uploads/djlubfbgab1au1bh3jxk.jpg",
    },
    {
      name: "C++ Book",
      price: 200,
      imgUrl:
        "https://res.cloudinary.com/dvhxhzwum/image/upload/v1741980840/uploads/djlubfbgab1au1bh3jxk.jpg",
    },
    {
      name: "C++ Book",
      price: 200,
      imgUrl:
        "https://res.cloudinary.com/dvhxhzwum/image/upload/v1741980840/uploads/djlubfbgab1au1bh3jxk.jpg",
    },
    {
      name: "C++ Book",
      price: 200,
      imgUrl:
        "https://res.cloudinary.com/dvhxhzwum/image/upload/v1741980840/uploads/djlubfbgab1au1bh3jxk.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <ItemCard
          key={item.name}
          name={item.name}
          price={item.price}
          imgUrl={item.imgUrl}
        />
      ))}
    </div>
  );
};

export default ItemGrid;
