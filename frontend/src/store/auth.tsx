import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the authentication state
interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  email: string | null;
  token: string | null;
}

// Define the shape of the context value
interface AuthContextType {
  authState: AuthState;
  login: (user: string, token: string, email: string) => void;
  logout: () => void;
  storeTokenInLocalStorage: (token: string) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userId: null,
    email: null,
    token: null,
  });

  const storeTokenInLocalStorage = (token: string) => {
    localStorage.setItem("token", token);
  };

  const login = (user: string, token: string, email: string) => {
    setAuthState({ isAuthenticated: true, userId: user, token, email });
    storeTokenInLocalStorage(token);
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      userId: null,
      token: null,
      email: null,
    });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ authState, login, logout, storeTokenInLocalStorage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
