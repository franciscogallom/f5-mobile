import axios from "axios"
import { API_URL_BASE } from "../API_URL_BASE"

interface Response {
  error: boolean
  message: string
}

export const forgotPassword = (email: string): Promise<Response> =>
  axios
    .put(`${API_URL_BASE}/users/forgot-password`, {
      email,
    })
    .then((res) => res.data)
