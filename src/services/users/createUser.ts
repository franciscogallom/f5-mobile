import axios from "axios"
import { BASE_URL } from "../../BASE_URL"
import { NewUser, CreateUserResponse } from "../../interfaces/interfaces"

export const createUser = async (
  newUser: NewUser
): Promise<CreateUserResponse> =>
  axios
    .post(`${BASE_URL}/users/signup`, newUser)
    .then((response) => response.data)
