import { UserState } from "../redux/userReducer"
import { useSelector } from "react-redux"

export function getUsername(): string {
  const username = useSelector<UserState, UserState["username"]>(
    (state) => state.username
  )
  return username
}
