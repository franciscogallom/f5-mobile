import React, { FC, useState } from "react"
import { View, StyleSheet } from "react-native"

import { Formik } from "formik"
import Axios from "axios"

import { userSchema } from "../schemas/user"

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

const SignUp: FC = () => {
  const [error, setError] = useState("")
  const [userExists, setUserExists] = useState(false)

  const createUser = (values: NewUser) => {
    // verify that the user doesn't exist.
    Axios.get(`http://10.0.2.2:3001/user/${values.user}`)
      // if i find it, the user already exist and i notify the user.
      .then(() => {
        setUserExists(true)
        setTimeout(() => {
          setUserExists(false)
        }, 7000)
      })
      // if i not find it, i can create the user.
      .catch(() => {
        Axios.post("http://10.0.2.2:3001/user/create", values)
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

  return (
    <Formik
      initialValues={{
        user: "",
        password: "",
        email: "",
        emailVerification: "",
        phone: "",
      }}
      validationSchema={userSchema}
      onSubmit={(values) => createUser(values)}
    >
      {({ handleChange, handleSubmit, values, touched, errors }) => (
        <View style={signUp.container}>
          <InputLogInAndSignUp
            dataType={values.user}
            placeholder="usuario"
            setDataType={handleChange("user")}
          />
          {userExists ? (
            <ErrorText text="el usuario ya existe" />
          ) : (
            touched.user && <ErrorText text={`${errors.user}`} />
          )}
          <InputLogInAndSignUp
            dataType={values.password}
            placeholder="contraseña"
            secureTextEntry
            setDataType={handleChange("password")}
          />
          {touched.password && <ErrorText text={`${errors.password}`} />}
          <InputLogInAndSignUp
            dataType={values.email}
            placeholder="email"
            setDataType={handleChange("email")}
          />
          {touched.email && <ErrorText text={`${errors.email}`} />}
          <InputLogInAndSignUp
            dataType={values.emailVerification}
            placeholder="repetir email"
            setDataType={handleChange("emailVerification")}
          />
          {touched.emailVerification && (
            <ErrorText text={`${errors.emailVerification}`} />
          )}
          <InputLogInAndSignUp
            dataType={values.phone}
            placeholder="celular (opcional)"
            setDataType={handleChange("phone")}
          />
          {touched.phone && <ErrorText text={`${errors.phone}`} />}
          {error !== "" && !userExists && <ErrorText text={`${error}`} />}
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
