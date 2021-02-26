import React, { useState } from "react"
import { View, StyleSheet } from "react-native"

import ButtonOne from "../components/ButtonOne"
import InputLogInAndSignUp from "../components/InputLogInAndSignUp"

import Axios from "axios"
interface NewUser {
  user: string
  password: string
  email: string
  emailVerification: string
  phone: string
}

const SignUp = (): JSX.Element => {
  const [newUser, setNewUser] = useState<NewUser>({
    user: "usuario.",
    password: "password.",
    email: "email.",
    emailVerification: "repetir email.",
    phone: "celular.",
  })

  const createUser = () => {
    Axios.post("http://10.0.2.2:3001/create", newUser).then(() => {
      console.log("User adding.")
    })
  }

  const onSignUp = (): void => {
    newUser.email === newUser.emailVerification
      ? createUser()
      : alert("Algo salio mal! Verifica tu confirmación de email.")
  }

  return (
    <View style={logIn.container}>
      <InputLogInAndSignUp
        dataType={newUser.user}
        setDataType={(user: string) => setNewUser({ ...newUser, user })}
        isPassword={false}
      />

      <InputLogInAndSignUp
        dataType={newUser.password}
        setDataType={(password: string) => setNewUser({ ...newUser, password })}
        isPassword={true}
      />

      <InputLogInAndSignUp
        dataType={newUser.email}
        setDataType={(email: string) => setNewUser({ ...newUser, email })}
        isPassword={false}
      />

      <InputLogInAndSignUp
        dataType={newUser.emailVerification}
        setDataType={(emailVerification: string) =>
          setNewUser({ ...newUser, emailVerification })
        }
        isPassword={false}
      />

      <InputLogInAndSignUp
        dataType={newUser.phone}
        setDataType={(phone: string) => setNewUser({ ...newUser, phone })}
        isPassword={false}
      />

      <ButtonOne text="registrarme" handleTap={onSignUp} />
    </View>
  )
}

const logIn = StyleSheet.create({
  container: {
    alignItems: "center",
  },
})

export default SignUp
