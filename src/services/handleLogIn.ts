import axios from "axios"

interface User {
  user: string
  password: string
}

export const handleLogIn = (values: User): Promise<User> => {
  return axios
    .post("http://10.0.2.2:3001/users/login", values)
    .then((response) => {
      const { data } = response
      return data
    })
}
