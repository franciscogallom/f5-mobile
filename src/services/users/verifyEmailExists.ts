import axios from "axios"
import { API_URL_BASE } from "../API_URL_BASE"

export const verifyEmailExists = async (email: string): Promise<string> =>
  axios
    .post(`${API_URL_BASE}/users/verify-email-exists`, { newEmail: email })
    .then((response) => response.data)
