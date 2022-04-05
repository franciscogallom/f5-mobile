import axios from "axios"
import { API_URL_BASE } from "../API_URL_BASE"

export const getVerificationCode = async (email: string): Promise<string> =>
  axios
    .post(`${API_URL_BASE}/users/send-verification-code`, { email })
    .then((response) => response.data)
