import axios from "axios"
import { BASE_URL } from "../../BASE_URL"

interface Response {
  error: boolean
  message: string
}

export const forgotPassword = (email: string): Promise<Response> =>
  axios
    .put(`${BASE_URL}/users/forgot-password`, {
      email,
    })
    .then((res) => res.data)
