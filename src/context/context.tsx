import React, { createContext, useState } from "react"
import { MyGameData } from "../interfaces/props"

type MyGameDataTpye = MyGameData | undefined

type ContextType = {
  myGameData: MyGameDataTpye
  setMyGameData: React.Dispatch<React.SetStateAction<MyGameDataTpye>>
}

type Props = {
  children: JSX.Element[]
}

const Context = createContext<ContextType>({} as ContextType)

export const ContextProvider = ({ children }: Props): JSX.Element => {
  const [myGameData, setMyGameData] = useState<MyGameDataTpye>(undefined)

  return (
    <Context.Provider value={{ myGameData, setMyGameData }}>
      {children}
    </Context.Provider>
  )
}

export default Context
