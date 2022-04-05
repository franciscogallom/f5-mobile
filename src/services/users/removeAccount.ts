import axios from "axios"
import { API_URL_BASE } from "../API_URL_BASE"

interface Response {
  message: string
}

export const removeAccount = (
  username: string,
  password: string
): Promise<Response> =>
  axios
    .delete(`${API_URL_BASE}/users/delete/${username}`, { data: { password } })
    .then((res) => res.data)
