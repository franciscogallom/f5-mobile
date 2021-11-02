import axios from "axios"
import { BASE_URL } from '../BASE_URL'

export const userExist = (user: string): Promise<boolean> => {
  return axios
    .get(`${BASE_URL}/users/${user}`)
    .then(() => Promise.resolve(true))
    .catch(() => Promise.resolve(false))
}
