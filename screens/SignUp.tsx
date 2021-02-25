import React, { useState } from "react"
import { View, StyleSheet } from "react-native"

import { colors } from "../assets/colors"

import ButtonOne from "../components/ButtonOne"
import InputLogInAndSignUp from "../components/InputLogInAndSignUp"

import Axios from "axios"
interface NewUser {
  user: string
  password: string
  email: string
  emailVerification: string
  phone: string
  position: string
}

const SignUp = (): JSX.Element => {
  const [newUser, setNewUser] = useState<NewUser>({
    user: "usuario.",
    password: "password.",
    email: "email.",
    emailVerification: "repetir email.",
    phone: "celular.",
    position: "posición en la cancha",
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
      />

      <InputLogInAndSignUp
        dataType={newUser.password}
        setDataType={(password: string) => setNewUser({ ...newUser, password })}
      />

      <InputLogInAndSignUp
        dataType={newUser.email}
        setDataType={(email: string) => setNewUser({ ...newUser, email })}
      />

      <InputLogInAndSignUp
        dataType={newUser.emailVerification}
        setDataType={(emailVerification: string) =>
          setNewUser({ ...newUser, emailVerification })
        }
      />

      <InputLogInAndSignUp
        dataType={newUser.phone}
        setDataType={(phone: string) => setNewUser({ ...newUser, phone })}
      />

      <InputLogInAndSignUp
        dataType={newUser.position}
        setDataType={(position: string) => setNewUser({ ...newUser, position })}
      />

      <ButtonOne text="registrarme" handleTap={onSignUp} />
    </View>
  )
}

const logIn = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold",
    fontSize: 12.5,
    marginBottom: 100,
  },
  goToSignUp: {
    color: colors.tertiary,
    textDecorationLine: "underline",
    textDecorationColor: colors.tertiary,
  },
})

export default SignUp
