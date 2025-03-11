import { createContext, ReactNode, useContext } from "react";

interface AuthContextType {
  storeTokenInLocalStorage: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode; // Define the type for children
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const storeTokenInLocalStorage = (token: string) => {
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider value={{ storeTokenInLocalStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return authContextValue;
};
