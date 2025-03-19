import { create } from "zustand";
import axios from "axios";
import api from "../utils/api";

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  sellerId: any;
  category: string;
  condition: string;
  imgUrl: string;
  sellerName: string;
}

interface ItemStore {
  items: Item[];
  currentItem: Item | null;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
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
  setLoading: (loading) => set({ isLoading: loading }),

  fetchItems: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/api/items");

      // TODO: remove the console log
      //console.log("Items list from server: ", response.data.items);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      if (response.data.items.length !== get().items.length) {
        set({ items: response.data.items, isLoading: false });
      }
      set({ isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  addItem: async (item: Item, token: string) => {
    try {
      const response = await api.post("/api/items/", item, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.data.success) {
        set({ error: response.data.message });
        throw new Error(response.data.message);
      }
      set({ items: [...get().items, response.data.item] });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  setCurrentItem: async (id) => {
    const existingItem = get().items.find((i) => i._id === id);
    if (existingItem) {
      set({ currentItem: existingItem });
    } else {
      try {
        const response = await api.get(`/api/items/${id}`);
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
