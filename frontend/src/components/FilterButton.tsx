import React, { useState } from "react";
import { categories } from "../utils/ItemConfig.ts";
import useItemStore from "../store/useItemStore.ts";

interface CategoryOption {
  id: string;
  name: string;
  selected: boolean;
}

const FilterDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryOption[]
  >(categories.map((category) => ({ ...category, selected: false })));

  const { selectedCategoryId, setSelectedCategoryId } = useItemStore();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCategory = (id: string) => {
    setSelectedCategoryId(id);
  };

  // Get the display name for the button
  const selectedCategory = selectedCategories.find((cat) => cat.selected);
  const buttonText = selectedCategoryId
    ? categories.find((category) => category.id === selectedCategoryId)?.name
    : "Category";

  return (
    <div className="relative font-sans">
      {/* Filter Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between gap-2 bg-blue-600 text-white px-2 py-2 rounded-md text-sm font-medium hover:cursor-pointer"
      >
        {buttonText}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-50 bg-gray-800 rounded-md shadow-lg overflow-hidden z-10 text-white">
          <div className="p-2">
            <h3 className="text-lg font-medium mb-2">Category</h3>
            <div className="space-y-2">
              {selectedCategories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={category.selected}
                    onChange={() => selectCategory(category.id)}
                    name="category"
                    className="w-4 h-4 rounded-full border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
