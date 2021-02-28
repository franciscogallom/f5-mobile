import React from "react"
import { View, StyleSheet } from "react-native"

import { Formik } from "formik"

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
  const createUser = (values: NewUser) => {
    Axios.post("http://10.0.2.2:3001/create", values).then(() => {
      console.log("user adding.")
    })
  }

  return (
    <Formik
      initialValues={{
        user: "usuario.",
        password: "contraseña.",
        email: "email.",
        emailVerification: "repetir email.",
        phone: "celular (opcional).",
      }}
      onSubmit={(values) =>
        values.email === values.emailVerification
          ? createUser(values)
          : alert("Algo salio mal! Verifica tu confirmación de email.")
      }
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={signUp.container}>
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
          <InputLogInAndSignUp
            dataType={values.email}
            isPassword={false}
            setDataType={handleChange("email")}
          />
          <InputLogInAndSignUp
            dataType={values.emailVerification}
            isPassword={false}
            setDataType={handleChange("emailVerification")}
          />
          <InputLogInAndSignUp
            dataType={values.phone}
            isPassword={false}
            setDataType={handleChange("phone")}
          />
          <ButtonOne text="registrarme" handleTap={handleSubmit} />
        </View>
      )}
    </Formik>
  )
}

const signUp = StyleSheet.create({
  container: {
    alignItems: "center",
  },
})

export default SignUp
