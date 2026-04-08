import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    const isLoggedIn = !!user;

   const login = ({ name, email }) => {
   setUser({ name, email });
    };

    const logout = ()=>{
        setUser(null)
    };
  return (
   <AuthContext.Provider value={{user, isLoggedIn, login, logout}}>
    {children}
   </AuthContext.Provider>
  )
}

export function useAuth() {
    const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}