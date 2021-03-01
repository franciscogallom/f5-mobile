import React from "react"
import { View, StyleSheet } from "react-native"

import { Formik } from "formik"
import * as yup from "yup"
import Axios from "axios"

import ButtonOne from "../components/ButtonOne"
import InputLogInAndSignUp from "../components/InputLogInAndSignUp"
import ErrorText from "../components/ErrorText"

interface NewUser {
  user: string
  password: string
  email: string
  emailVerification: string
  phone: string
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

yup.setLocale({
  mixed: {
    default: "campo inválido",
  },
  string: {
    min: ({ min }: { min: number }) => `mínimo ${min} caracteres`,
    max: ({ max }: { max: number }) => `máximo ${max} caracteres`,
  },
})

const schema = yup.object({
  user: yup.string().required("el usuario es requerido").min(3).max(20),
  password: yup.string().required("la contraseña es requerida").min(5).max(30),
  email: yup
    .string()
    .required("el email es requerido")
    .email("email inválido")
    .max(75),
  emailVerification: yup
    .string()
    .oneOf([yup.ref("email"), null], "los emails no coinciden"),
  phone: yup
    .string()
    .min(5)
    .max(25)
    .matches(phoneRegExp, "número de celular inválido"),
})

const createUser = (values: NewUser) => {
  Axios.post("http://10.0.2.2:3001/create", values).then((response) => {
    console.log(response)
  })
}

const SignUp = (): JSX.Element => {
  return (
    <Formik
      initialValues={{
        user: "",
        password: "",
        email: "",
        emailVerification: "",
        phone: "",
      }}
      validationSchema={schema}
      onSubmit={(values) => createUser(values)}
    >
      {({ handleChange, handleSubmit, values, touched, errors }) => (
        <View style={signUp.container}>
          <InputLogInAndSignUp
            dataType={values.user}
            placeholder="usuario"
            isPassword={false}
            setDataType={handleChange("user")}
          />
          {touched.user && <ErrorText text={`${errors.user}`} />}
          <InputLogInAndSignUp
            dataType={values.password}
            placeholder="contraseña"
            isPassword={true}
            setDataType={handleChange("password")}
          />
          {touched.password && <ErrorText text={`${errors.password}`} />}
          <InputLogInAndSignUp
            dataType={values.email}
            placeholder="email"
            isPassword={false}
            setDataType={handleChange("email")}
          />
          {touched.email && <ErrorText text={`${errors.email}`} />}
          <InputLogInAndSignUp
            dataType={values.emailVerification}
            placeholder="repetir email"
            isPassword={false}
            setDataType={handleChange("emailVerification")}
          />
          {touched.emailVerification && (
            <ErrorText text={`${errors.emailVerification}`} />
          )}
          <InputLogInAndSignUp
            dataType={values.phone}
            placeholder="celular (opcional)"
            isPassword={false}
            setDataType={handleChange("phone")}
          />
          {touched.phone && <ErrorText text={`${errors.phone}`} />}
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
