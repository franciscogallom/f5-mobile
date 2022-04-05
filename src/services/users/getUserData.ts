import axios from "axios"
import { API_URL_BASE } from "../API_URL_BASE"
import { UserData } from "../../interfaces/interfaces"

export const getUserData = (user: string): Promise<UserData> =>
  axios.get(`${API_URL_BASE}/users/${user}`).then((response) => response.data)
