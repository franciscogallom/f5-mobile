import Axios from "axios"

interface NewUser {
  user: string
  password: string
  email: string
  emailVerification: string
  phone: string
}

export const createUser = (
  newUser: NewUser,
  setUserExists: (bool: boolean) => void,
  setError: (str: string) => void
): void => {
  // verify that the user doesn't exist.
  Axios.get(`http://10.0.2.2:3001/user/${newUser.user}`)
    // if i find it, the user already exist and i notify the user.
    .then(() => {
      setUserExists(true)
      setTimeout(() => {
        setUserExists(false)
      }, 7000)
    })
    // if i not find it, i can create the user.
    .catch(() => {
      Axios.post("http://10.0.2.2:3001/user/create", newUser)
        .then((response) => {
          console.log(response)
        })
        .catch(() => {
          setError("algo salió mal, intenta nuevamente")
          setTimeout(() => {
            setError("")
          }, 5000)
        })
    })
}
