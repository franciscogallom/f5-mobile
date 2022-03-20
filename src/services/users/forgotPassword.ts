import axios from "axios"
import { BASE_URL } from "../../BASE_URL"

interface Response {
  error: boolean
  message: string
}

// TO-DO: delete 'undefined' when Drawer Navigation is implemented.
export const forgotPassword = (email: string | undefined): Promise<Response> =>
  axios
    .put(`${BASE_URL}/users/forgot-password`, {
      email,
    })
    .then((res) => res.data)
