import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  email: string | null;
  token: string | null;
  login: (userId: string, email: string, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem("token") ? true : false,
  userId: null,
  email: null,
  token: null,
  login: (userId, email, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", email);
    set({
      isAuthenticated: true,
      userId,
      email,
      token,
    });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    set({
      isAuthenticated: false,
      userId: null,
      email: null,
      token: null,
    });
  },
}));

export default useAuthStore;

