import { create } from "zustand";
import axios from "axios";

interface ItemStore {
  items: any[];
  currentItem: any;
  isLoading: boolean;
  error: any;
  fetchItems: () => Promise<void>;
  setCurrentItem: (item: any) => void;
}

const useItemStore = create<ItemStore>((set) => ({
  items: [],
  currentItem: null,
  isLoading: false,
  error: null,

  fetchItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/items");
      set({ items: response.data.items, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setCurrentItem: (item) => set({ currentItem: item }),
}));

export default useItemStore;
