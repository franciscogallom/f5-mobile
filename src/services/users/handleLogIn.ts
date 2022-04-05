import axios from "axios"
import { API_URL_BASE } from "../API_URL_BASE"

interface User {
  user: string
  password: string
}

export const handleLogIn = (values: User): Promise<User> =>
  axios
    .post(`${API_URL_BASE}/users/login`, values)
    .then((response) => response.data)
