import { create } from "zustand";

export interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
}

interface AuthState {
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  user: User | null;
  userId: string;
  email: string;
  token: string;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  const storedUser = localStorage.getItem("user");
  return {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    user: storedUser ? JSON.parse(storedUser) : null,

    userId: localStorage.getItem("userId") || "",
    email: localStorage.getItem("email") || "",
    token: localStorage.getItem("token") || "",

    setUser: (user) => set({ user }),

    login: (user, token) => {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("email", user.email);
      localStorage.setItem("user", JSON.stringify(user));

      set({
        isAuthenticated: true,
        user: user,
        userId: user._id,
        email: user.email,
        token: token,
      });
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("user");
      set({
        isAuthenticated: false,
        user: null,
        userId: "",
        email: "",
        token: "",
      });
    },
  };
});

export default useAuthStore;
