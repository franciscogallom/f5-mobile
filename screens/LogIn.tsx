import React, { useState } from "react"
import { View, StyleSheet } from "react-native"

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
    </View>
  )
}

const logIn = StyleSheet.create({
  container: {
    alignItems: "center",
  },
})

export default LogIn
