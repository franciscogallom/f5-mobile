import React from "react"
import { View, StyleSheet, Text } from "react-native"

import { Formik } from "formik"
import * as yup from "yup"

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
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object({
  user: yup.string().required().min(3).max(20),
  password: yup.string().required().min(5).max(30),
  email: yup.string().required().email().max(75),
  emailVerification: yup
    .string()
    .required()
    .email()
    .oneOf([yup.ref("email"), null], "emails don't match"),
  phone: yup
    .string()
    .min(5)
    .max(25)
    .matches(phoneRegExp, "invalid phone number"),
})

const createUser = (values: NewUser) => {
  Axios.post("http://10.0.2.2:3001/create", values).then(() => {
    console.log("user adding.")
  })
}

const SignUp = (): JSX.Element => {
  return (
    <Formik
      initialValues={{
        user: "usuario.",
        password: "contraseña.",
        email: "email.",
        emailVerification: "repetir email.",
        phone: "celular (opcional).",
      }}
      validationSchema={schema}
      onSubmit={(values) => createUser(values)}
    >
      {({ handleChange, handleSubmit, values, touched, errors }) => (
        <View style={signUp.container}>
          <InputLogInAndSignUp
            dataType={values.user}
            isPassword={false}
            setDataType={handleChange("user")}
          />
          <Text style={signUp.errortext}>{touched.user && errors.user}</Text>
          <InputLogInAndSignUp
            dataType={values.password}
            isPassword={true}
            setDataType={handleChange("password")}
          />
          <Text style={signUp.errortext}>
            {touched.password && errors.password}
          </Text>
          <InputLogInAndSignUp
            dataType={values.email}
            isPassword={false}
            setDataType={handleChange("email")}
          />
          <Text style={signUp.errortext}>{touched.email && errors.email}</Text>
          <InputLogInAndSignUp
            dataType={values.emailVerification}
            isPassword={false}
            setDataType={handleChange("emailVerification")}
          />
          <Text style={signUp.errortext}>
            {touched.emailVerification && errors.emailVerification}
          </Text>
          <InputLogInAndSignUp
            dataType={values.phone}
            isPassword={false}
            setDataType={handleChange("phone")}
          />
          <Text style={signUp.errortext}>{touched.phone && errors.phone}</Text>
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
  errortext: {
    color: colors.quaternary,
  },
})

export default SignUp
