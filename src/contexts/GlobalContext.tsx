import React, { createContext, ReactNode, useContext } from "react";
import UserContextProvider from "./UserContext";

interface GlobalContextProps { }
const GlobalContext = createContext({});

interface GlobalContextProviderProps {
  children: ReactNode
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  return (
    <GlobalContext.Provider value={{}}>
      <UserContextProvider>
        {children}
      </UserContextProvider>
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider

export const useGlobalContext = () => useContext(GlobalContext);