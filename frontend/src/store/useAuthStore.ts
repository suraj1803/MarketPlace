import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  email: string;
  token: string;
  login: (userId: string, email: string, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem("token") ? true : false,
  userId: localStorage.getItem("userId") || "",
  email: localStorage.getItem("email") || "",
  token: localStorage.getItem("token") || "",
  login: (userId, email, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", email);
    set({
      isAuthenticated: true,
      userId: userId,
      email: email,
      token: token,
    });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    set({
      isAuthenticated: false,
      userId: "",
      email: "",
      token: "",
    });
  },
}));

export default useAuthStore;
