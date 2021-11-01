import axios from "axios"

interface User {
  user: string
  password: string
}

export const handleLogIn = (values: User): Promise<User> => {
  return axios
    .post(`${process.env.REACT_NATIVE_BASE_URL}/users/login`, values)
    .then((response) => {
      const { data } = response
      return data
    })
}
