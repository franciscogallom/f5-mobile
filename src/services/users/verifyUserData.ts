import axios from "axios"
import { API_URL_BASE } from "../API_URL_BASE"
import { NewUser, VerifyUserDataResponse } from "../../interfaces/interfaces"

export const verifyUserData = async (
  newUser: NewUser
): Promise<VerifyUserDataResponse> =>
  axios
    .post(`${API_URL_BASE}/users/verify-data`, newUser)
    .then((response) => response.data)
