import axios from "axios"
import { API_URL_BASE } from "../API_URL_BASE"
import { NewUser, CreateUserResponse } from "../../interfaces/interfaces"

export const createUser = async (
  newUser: NewUser
): Promise<CreateUserResponse> =>
  axios
    .post(`${API_URL_BASE}/users/signup`, newUser)
    .then((response) => response.data)
