import { Action } from "./actions"
import AsyncStorage from "@react-native-async-storage/async-storage"

export interface UserState {
  username: string
}

const initialState = {
  username: "",
}

const getData = async () => {
  try {
    const username = await AsyncStorage.getItem("username")
    if (username !== null) {
      initialState.username = username
    }
  } catch (e) {
    initialState.username = ""
  }
}

getData()

export const userReducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case "MODIFY_USER": {
      return { ...state, username: action.payload }
    }
    case "REMOVE_USER": {
      return { ...state, username: "" }
    }
    default:
      return state
  }
}
