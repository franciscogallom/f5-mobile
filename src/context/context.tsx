import React, { createContext, useState } from "react"

import { MyGameData } from "../interfaces/props"

type MyGameDataTpye = MyGameData | undefined

type ContextType = {
  myGameData: MyGameDataTpye
  setMyGameData: React.Dispatch<React.SetStateAction<MyGameDataTpye>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

type Props = {
  children: JSX.Element[]
}

const Context = createContext<ContextType>({} as ContextType)

export const ContextProvider = ({ children }: Props): JSX.Element => {
  const [myGameData, setMyGameData] = useState<MyGameDataTpye>(undefined)
  const [token, setToken] = useState("")

  return (
    <Context.Provider value={{ myGameData, setMyGameData, token, setToken }}>
      {children}
    </Context.Provider>
  )
}

export default Context
