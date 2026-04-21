import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  signup: () => {},
});

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    const isLoggedIn = !!user;

    const setAuthUser = ({ name, email }) => {
      setUser({ name, email })
    }

    const logout = ()=>{
      setUser(null)
    };

    const login = (data) => setAuthUser(data);
    const signup = (data) => setAuthUser(data);
    return (
    <AuthContext.Provider value={{user, isLoggedIn, login, logout, signup}}>
      {children}
    </AuthContext.Provider>
    )
}