import Axios from "axios"
import { Dispatch } from "react"
import { addUser, Action } from "../redux/actions"

interface NewUser {
  user: string
  password: string
  email: string
  emailVerification: string
  phone: string
}

export const createUser = (
  newUser: NewUser,
  dispatch: Dispatch<Action>,
  setUserExists: (bool: boolean) => void,
  setError: (str: string) => void,
  setLoader: (bol: boolean) => void
): void => {
  setLoader(true)
  // verify that the user doesn't exist.
  Axios.get(`http://10.0.2.2:3001/users/${newUser.user}`)
    // if i find it, the user already exist and i notify the user.
    .then(() => {
      setUserExists(true)
      setTimeout(() => {
        setUserExists(false)
      }, 7000)
    })
    // if i not find it, i can create the user.
    .catch(() => {
      Axios.post("http://10.0.2.2:3001/users/create", newUser)
        .then(() => {
          dispatch(addUser(newUser.user))
        })
        .catch(() => {
          setError("algo salió mal..")
          setTimeout(() => {
            setError("")
          }, 5000)
        })
        .finally(() => setLoader(false))
    })
    .finally(() => setLoader(false))
}
