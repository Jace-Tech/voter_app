import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IUser } from "../@types/common";
import { registerUser, registerUserAlt, testing } from "../api/auth";
import { storeObjectData } from "../utils/store";
import { useToastContext } from "./ToastContext";


interface UserContextProps {
  user: IUser | null
  handleSignUp: (data: any) => Promise<boolean>;
  setCurrentStore: (store: any) => void;
  currentStore: any;
}
const UserContext = createContext({} as UserContextProps);

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [currentStore, setCurrentStore] = useState(null)
  const { showToast } = useToastContext()

  const handleSignUp = async (data: any) => {
    const result = await registerUser(data)
    console.log(JSON.stringify({ result }, null, 4))
    if (!result?.success) {
      showToast("error", result?.message)
      return false
    }
    // Clear DB
    setCurrentStore(null)
    // Set user
    setUser(result?.data)
    // Add data to store
    showToast("success", result?.message)
    await storeObjectData("PREV_USER", result?.data)
    return true
  }

  return (
    <UserContext.Provider
      value={{
        handleSignUp,
        setCurrentStore,
        currentStore,
        user
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

export const useUserContext = () => useContext(UserContext);