import axios from "axios"
import { BASE_URL } from "../../BASE_URL"

export const getVerificationCode = async (email: string): Promise<string> =>
  axios
    .post(`${BASE_URL}/users/send-verification-code`, { email })
    .then((response) => response.data)
