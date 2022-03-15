import axios from "axios"
import { BASE_URL } from "../../BASE_URL"

interface Response {
  message: string
}

export const removeAccount = (
  username: string,
  password: string
): Promise<Response> =>
  axios
    .delete(`${BASE_URL}/users/delete/${username}`, { data: { password } })
    .then((res) => res.data)
