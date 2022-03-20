import axios from "axios"
import { BASE_URL } from "../../BASE_URL"
import { NewUser, VerifyUserDataResponse } from "../../interfaces/interfaces"

export const verifyUserData = async (
  newUser: NewUser
): Promise<VerifyUserDataResponse> =>
  axios
    .post(`${BASE_URL}/users/verify-data`, newUser)
    .then((response) => response.data)
