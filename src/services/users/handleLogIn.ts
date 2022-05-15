import axios from "axios"
import { API_URL_BASE } from "../API_URL_BASE"

interface User {
  user: string
  password: string
}

interface Response {
  token: string
}

export const handleLogIn = (values: User): Promise<Response> =>
  axios
    .post(`${API_URL_BASE}/users/login`, values)
    .then((response) => response.data)
