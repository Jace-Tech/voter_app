import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IUser } from "../@types/common";
import { registerUser } from "../api/auth";

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

  const handleSignUp = async (data: any) => {
    const result = await registerUser(data)
    console.log(JSON.stringify({result}, null, 4))
    if(!result?.success) {
      alert(result.message)
      return false
    }
    alert(result.message)
    return true
  }

  useEffect(() => {
    console.log(JSON.stringify(currentStore, null, 4))
  }, [currentStore])

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