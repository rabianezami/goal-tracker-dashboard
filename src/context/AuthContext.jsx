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

    const signup = ({ name, email }) => {
      setUser({ name, email });
    };
    return (
    <AuthContext.Provider value={{user, isLoggedIn, login, logout, signup}}>
      {children}
    </AuthContext.Provider>
    )
}