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
  addItem: (item: Item, token: string) => void;
}

const useItemStore = create<ItemStore>((set, get) => ({
  items: [],
  currentItem: null,
  isLoading: false,
  error: null,

  fetchItems: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/api/items");
      console.log("Items list from server: ", response.data.items);
      if (response.data.items.length != get().items.length) {
        set({ items: response.data.items, isLoading: false });
      }
      set({ isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  addItem: async (item: Item, token: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post("/api/items/", item, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      set({ items: [...get().items, item], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
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
