import axios from "axios"
import { userExist } from "./userExist"
import { BASE_URL } from '../BASE_URL'

interface NewUser {
  user: string
  password: string
  email: string
  emailVerification: string
  phone: string
}

export const createUser = async (newUser: NewUser): Promise<string> => {
  const userAlreadyExists = await userExist(newUser.user)
  if (userAlreadyExists) {
    return Promise.reject("userAlreadyExists")
  } else {
    return axios
      .post(`${BASE_URL}/users/create`, newUser)
      .then(() => newUser.user)
  }
}
