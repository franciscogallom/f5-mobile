import axios from "axios"
import { BASE_URL } from '../BASE_URL'

interface User {
  user: string
  password: string
}

export const handleLogIn = (values: User): Promise<User> => {
  return axios
    .post(`${BASE_URL}/users/login`, values)
    .then((response) => {
      const { data } = response
      return data
    })
}
