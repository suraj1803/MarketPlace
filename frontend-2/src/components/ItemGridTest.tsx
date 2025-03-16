import React from "react";

interface Item {
  //_id: string;
  name: string;
  //description: string;
  price: number;
  imgUrl: string;
  //sellerId: string;
}

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

const ItemGridTest: React.FC = () => {
  return (
    <section className="text-black-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap m-4 ">
          {items.map((item) => (
            <div
              key={item.name}
              className="lg:w-1/4 md:w-1/2 p-4 w-full border-1 border-gray-00 rounded-lg"
            >
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="bg-gray-200 object-contain w-full h-full block"
                  src={item.imgUrl}
                />
              </a>
              <div className="mt-4">
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {item.name}
                </h2>
                <p className="mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemGridTest;
