import { useSelector } from "react-redux"

import { UserState } from "./userReducer"

export function getUsername(): string {
  const username = useSelector<UserState, UserState["username"]>(
    (state) => state.username
  )
  return username
}
