import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"

import { colors } from "../assets/colors"

import ButtonOne from "../components/ButtonOne"
import InputLogInAndSignUp from "../components/InputLogInAndSignUp"

const LogIn = (): JSX.Element => {
  const [user, setUser] = useState<string>("usuario.")
  const [password, setPassword] = useState<string>("contraseña.")

  const handleLogIn = (): void => {
    alert(`user: ${user}, password: ${password}`)
  }

  return (
    <View style={logIn.container}>
      <InputLogInAndSignUp
        dataType={user}
        setDataType={(text: string) => setUser(text)}
      />

      <InputLogInAndSignUp
        dataType={password}
        setDataType={(text: string) => setPassword(text)}
      />

      <ButtonOne text="iniciar sesión" handleTap={handleLogIn} />

      <Text style={logIn.text}>
        No tenes cuenta? <Text style={logIn.goToSignUp}>Registrate!</Text>
      </Text>
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

export default LogIn
