import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CreateItemPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      condition: "new",
      location: "",
      quantity: 1,
    },
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [submitError, setSubmitError] = useState("");

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

  const onSubmit = async (data) => {
    try {
      // Check if at least one image is uploaded
      if (images.length === 0) {
        setSubmitError("At least one image is required");
        return;
      }

      // Clear previous errors
      setSubmitError("");

      // Combine form data with images
      const formData = {
        ...data,
        images,
      };

      // This would be replaced with your actual API call
      console.log("Submitting form data:", formData);

      // Mock successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Item created successfully!");

      // Reset form after successful submission
      reset();
      setImages([]);
      setPreviews([]);
    } catch (error) {
      console.error("Error creating item:", error);
      setSubmitError("Failed to create item. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            List an Item for Sale
          </h1>

          {submitError && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name", {
                  required: "Item name is required",
                })}
                className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.name ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
                className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.description ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Describe your item, including condition details, features, and any other relevant information."
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  id="price"
                  type="text"
                  {...register("price", {
                    required: "Price is required",
                    pattern: {
                      value: /^[0-9]+(\.[0-9]{1,2})?$/,
                      message: "Please enter a valid price",
                    },
                    validate: (value) =>
                      parseFloat(value) > 0 ||
                      "Price must be greater than zero",
                  })}
                  className={`block w-full pl-7 pr-12 py-2 sm:text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.price ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Category and Condition - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  {...register("category", {
                    required: "Please select a category",
                  })}
                  className={`mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.category ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Condition */}
              <div>
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium text-gray-700"
                >
                  Condition
                </label>
                <select
                  id="condition"
                  {...register("condition")}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {conditions.map((condition) => (
                    <option key={condition.id} value={condition.id}>
                      {condition.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location and Quantity - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  {...register("location")}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="City, State"
                />
              </div>

              {/* Quantity */}
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  {...register("quantity", {
                    min: {
                      value: 1,
                      message: "Quantity must be at least 1",
                    },
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Images <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload images</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        //onChange={handleImageUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {images.length === 0 && submitError.includes("image") && (
                <p className="mt-1 text-sm text-red-600">
                  At least one image is required
                </p>
              )}

              {/* Image Previews */}
              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {previews.map((src, index) => (
                    <div key={index} className="relative">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        //onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        aria-label="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "List Item for Sale"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateItemPage;
