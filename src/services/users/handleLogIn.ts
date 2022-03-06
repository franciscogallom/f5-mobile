import axios from "axios"
import { BASE_URL } from "../../BASE_URL"

interface User {
  user: string
  password: string
}

export const handleLogIn = (values: User): Promise<User> =>
  axios
    .post(`${BASE_URL}/users/login`, values)
    .then((response) => response.data)
