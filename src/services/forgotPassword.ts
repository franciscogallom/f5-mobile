import axios from "axios"
import { BASE_URL } from "../BASE_URL"

// TO-DO: delete 'undefined' when Drawer Navigation is implemented.
export const forgotPassword = (email: string | undefined): Promise<string> =>
  axios
    .put(`${BASE_URL}/users/forgot-password`, {
      email,
    })
    .then((res) => res.data)
