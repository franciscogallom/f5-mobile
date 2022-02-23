import axios from "axios"
import { BASE_URL } from "../BASE_URL"
import { UserData } from "../interfaces/interfaces"

export const getUserData = (user: string): Promise<UserData> =>
  axios.get(`${BASE_URL}/users/${user}`).then((response) => response.data)
