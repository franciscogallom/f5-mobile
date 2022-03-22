import axios from "axios"
import { BASE_URL } from "../../BASE_URL"

export const verifyEmailExists = async (email: string): Promise<string> =>
  axios
    .post(`${BASE_URL}/users/verify-email-exists`, { newEmail: email })
    .then((response) => response.data)
