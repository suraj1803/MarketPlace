import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useItemStore from "../store/useItemStore";
import SyncLoader from "react-spinners/SyncLoader";
import api from "../utils/api";
import { categories, conditions } from "../utils/ItemConfig";
import axios from "axios";

const ItemForm = () => {
  const { addItem, isLoading, setLoading } = useItemStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // TODO: remove the console log
      console.log("Form Data Before Sending:", data); // Debugging

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        alert("Please login to list an item");
        navigate("/login");
        return;
      }

      // Image upload
      const file = data.image[0];
      const formData = new FormData();
      formData.append("image", file);

      setLoading(true);
      const uploadResponse = await axios.post("/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (!uploadResponse.data.success) {
        throw new Error(uploadResponse.data.message || "Image upload failed");
      }

      const imgUrl = uploadResponse.data.data.url;

      // Item data submission
      const itemData = {
        ...data,
        sellerId: userId,
        price: Number(data.price),
        imgUrl,
      };

      // Remove the image file from the data being sent to prevent circular reference
      delete itemData.image;

      addItem(itemData, token);
      setLoading(false);
      alert("Item Listed Successfully.");
      console.log("ItemData: ", itemData);
      navigate("/");
    } catch (error: any) {
      // TODO: remove the console log
      console.error("Error listing item:", error);

      alert(error.response?.data?.message || "Failed to list item");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <SyncLoader color="#2563EB" loading={isLoading} size={30} />
      </div>
    );
  }
  return (
    <>
      <nav className="bg-blue-700 flex items-center sticky top-0 z-50 h-15">
        <div className="p-3 hover:cursor-pointer" onClick={() => navigate(-1)}>
          <FaArrowLeft className="text-white text-lg hover:text-gray-200 "></FaArrowLeft>
        </div>
      </nav>
      <div className="bg-gray-50 flex h-screen items-center justify-center">
        <div className="max-w-3xl mx-auto px-5">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6">List an item for sale</h1>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Item Name <span className="text-red-500">*</span>{" "}
                </label>

                <input
                  {...register("name", { required: true })}
                  id="name"
                  type="text"
                  className="mt-1 w-full py-2 px-4 border border-gray-100 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description <span className="text-red-500">*</span>{" "}
                </label>
                <textarea
                  {...register("description", { required: true })}
                  id="description"
                  rows={4}
                  className="w-full py-2 px-4 border-gray-100 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:ring-indigo-500"
                  placeholder="Describe your item, including condition details, features, and any other relevant information."
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700"
                >
                  Price <span className="text-red-500">*</span>{" "}
                </label>
                <input
                  {...register("price", { required: true })}
                  id="price"
                  type="number"
                  className="mt-1 w-full py-2 px-4 border border-gray-100 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-700"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("category", { required: true })}
                    id="category"
                    className="mt-1 w-full py-2 px-4 border border-gray-100 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:ring-indigo-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="condition"
                    className="text-sm font-medium text-gray-700"
                  >
                    Condition
                  </label>
                  <select
                    {...register("condition", { required: true })}
                    id="condition"
                    className="mt-1 w-full py-2 px-4 border border-gray-100 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:ring-indigo-500"
                  >
                    {conditions.map((condition) => (
                      <option key={condition.id} value={condition.name}>
                        {condition.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="text-sm font-medium text-gray-700"
                >
                  Image <span className="text-red-500">*</span>{" "}
                </label>

                <input
                  {...register("image", { required: true })}
                  id="image"
                  type="file"
                  className="mt-1 w-full py-2 px-4 border border-gray-100 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>

              <div className="">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors w-full"
                >
                  List Item for Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemForm;
