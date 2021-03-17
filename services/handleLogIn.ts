import Axios from "axios"
import { User } from '../screens/LogIn'
import { Dispatch } from "react"
import { addUser, Action } from "../redux/actions"

export const handleLogIn = (values: User, dispatch: Dispatch<Action>, setLoader: (bool: boolean) => void, setLogInStatus: (text : string) => void): void => {
    setLoader(true)
    Axios.post("http://10.0.2.2:3001/users/login", values)
      .then(() => {
        dispatch(addUser(values.user))
      })
      .catch((e) => {
        setLogInStatus(e.response.data.message || "algo salio mal..")
      })
      .finally(() => setLoader(false))
  }