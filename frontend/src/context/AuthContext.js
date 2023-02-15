import { createContext, useContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { user, login, signup, getUser, logout } = useAuth();

  useEffect(() => {
    getUser();
  }, [getUser]);

  const value = {
    user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
