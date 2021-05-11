import axios from "axios"

export const userExist = (user: string): Promise<boolean> => {
  return axios
    .get(`http://10.0.2.2:3001/users/${user}`)
    .then(() => Promise.resolve(true))
    .catch(() => Promise.resolve(false))
}
