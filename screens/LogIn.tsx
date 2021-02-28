import React from "react"
import { View, StyleSheet } from "react-native"

import { Formik } from "formik"

import ButtonOne from "../components/ButtonOne"
import InputLogInAndSignUp from "../components/InputLogInAndSignUp"

const LogIn = (): JSX.Element => {
  return (
    <Formik
      initialValues={{
        user: "usuario.",
        password: "contraseña.",
      }}
      onSubmit={(values) => alert(`${values.user} ${values.password}`)}
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
