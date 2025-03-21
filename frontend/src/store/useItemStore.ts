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
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
  setLoading: (loading: boolean) => void;
  error: any;
  fetchItems: () => Promise<void>;
  fetchItemsByCategory: () => Promise<void>;
  setCurrentItem: (item: any) => void;
  addItem: (item: Item, token: string) => void;
}

const useItemStore = create<ItemStore>((set, get) => ({
  items: [],
  currentItem: null,
  isLoading: false,
  error: null,
  selectedCategoryId: "",
  setLoading: (loading) => set({ isLoading: loading }),

  setSelectedCategoryId: (id) => {
    set({ selectedCategoryId: id });
  },

  fetchItemsByCategory: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `/api/items/category/${get().selectedCategoryId}`,
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      set({ items: response.data.items, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchItems: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/api/items");

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
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addItem: async (item: Item, token: string) => {
    try {
      const response = await axios.post("/api/items/", item, {
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
