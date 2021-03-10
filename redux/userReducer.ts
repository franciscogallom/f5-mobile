import { Action } from "./actions"

export interface UserState {
  username: string
}

const initialState = {
  username: "",
}

export const userReducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case "MODIFY_USER": {
      return { ...state, username: action.payload }
    }
    default:
      return state
  }
}
