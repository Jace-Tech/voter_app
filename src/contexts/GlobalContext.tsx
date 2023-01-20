import React, { createContext, ReactNode, useContext } from "react";
import ToastContextProvider from "./ToastContext";
import UserContextProvider from "./UserContext";

interface GlobalContextProps { }
const GlobalContext = createContext({});

interface GlobalContextProviderProps {
  children: ReactNode
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  return (
    <GlobalContext.Provider value={{}}>
      <ToastContextProvider>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </ToastContextProvider>
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider

export const useGlobalContext = () => useContext(GlobalContext);