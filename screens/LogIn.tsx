import React, { useState } from "react"
import { View, StyleSheet } from "react-native"

import { Formik } from "formik"
import Axios from "axios"

import ButtonOne from "../components/ButtonOne"
import InputLogInAndSignUp from "../components/InputLogInAndSignUp"
import ErrorText from "../components/ErrorText"

interface User {
  user: string
  password: string
}

const LogIn = (): JSX.Element => {
  const [logInStatus, setLogInStatus] = useState("")

  const handleLogIn = (values: User) => {
    Axios.post("http://10.0.2.2:3001/login", values).then((response) => {
      setLogInStatus(response.data.message || "successful login")
    })
  }

  return (
    <Formik
      initialValues={{
        user: "usuario.",
        password: "contraseña.",
      }}
      onSubmit={(values) => handleLogIn(values)}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={logIn.container}>
          <InputLogInAndSignUp
            dataType={values.user}
            isPassword={false}
            setDataType={handleChange("user")}
          />
          <InputLogInAndSignUp
            dataType={values.password}
            isPassword={true}
            setDataType={handleChange("password")}
          />
          {logInStatus ? <ErrorText text={logInStatus} /> : null}
          <ButtonOne text="iniciar sesión" handleTap={handleSubmit} />
        </View>
      )}
    </Formik>
  )
}

const logIn = StyleSheet.create({
  container: {
    alignItems: "center",
  },
})

export default LogIn
