import ImageUploader from "../components/ImageUploader";

const ItemForm = () => {
  const categories = [
    { id: "electronics", name: "Electronics" },
    { id: "clothing", name: "Clothing & Accessories" },
    { id: "home", name: "Home & Garden" },
    { id: "toys", name: "Toys & Games" },
    { id: "sports", name: "Sports & Outdoors" },
    { id: "books", name: "Books & Media" },
    { id: "other", name: "Other" },
  ];

  const conditions = [
    { id: "new", name: "New" },
    { id: "like_new", name: "Like New" },
    { id: "good", name: "Good" },
    { id: "fair", name: "Fair" },
    { id: "poor", name: "Poor" },
  ];
  const handleUpload = (file: File) => {
    // Here you would typically:
    // 1. Create a FormData object
    const formData = new FormData();
    formData.append("image", file);

    // 2. Send it to your server
    // Example:
    // fetch('your-upload-endpoint', {
    //   method: 'POST',
    //   body: formData,
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch(error => console.error('Error:', error));

    console.log("File to upload:", file);
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-5">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">List an item for sale</h1>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Item Name <span className="text-red-500">*</span>{" "}
              </label>

              <input
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
                  id="category"
                  className="mt-1 w-full py-2 px-4 border border-gray-100 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:ring-indigo-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
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
              <label></label>
              <ImageUploader
                onUpload={handleUpload}
                acceptedFileTypes="image/*"
                maxSizeMB={5}
              ></ImageUploader>
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
  );
};

export default ItemForm;
