import { create } from "zustand";
import axios from "axios";
import { Item } from "../App";

interface ItemStore {
  items: Item[];
  currentItem: any;
  isLoading: boolean;
  error: any;
  fetchItems: () => Promise<void>;
  setCurrentItem: (item: any) => void;
}

const useItemStore = create<ItemStore>((set, get) => ({
  items: [],
  currentItem: null,
  isLoading: false,
  error: null,

  fetchItems: async () => {
    const { items } = get();
    if (items.length > 0) return;
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/items");
      set({ items: response.data.items, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setCurrentItem: async (id) => {
    const existingItem = get().items.find((i) => i._id === id);
    if (existingItem) {
      set({ currentItem: existingItem });
    } else {
      try {
        const response = await axios.get(`/api/items/${id}`);
        if (!response.data.success) {
          throw new Error("Item not found");
        }
        set({ currentItem: response.data.item });
      } catch (error) {
        set({ error: (error as Error).message });
      }
    }
  },
}));

export default useItemStore;
