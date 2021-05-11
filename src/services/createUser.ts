import axios from "axios"

import { userExist } from "./userExist"

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
      .post("http://10.0.2.2:3001/users/create", newUser)
      .then(() => newUser.user)
  }
}
