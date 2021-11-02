import axios from "axios"

interface User {
  user: string
  password: string
}

export const handleLogIn = (values: User): Promise<User> => {
  return axios
    .post(`https://f5backend.herokuapp.com/users/login`, values)
    .then((response) => {
      const { data } = response
      return data
    })
}
