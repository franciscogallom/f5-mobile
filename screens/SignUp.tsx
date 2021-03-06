import React, { FC, useState } from "react"
import { View, StyleSheet } from "react-native"

import { Formik } from "formik"

import { userSchema } from "../schemas/user"
import { createUser } from "../services/createUser"

import ButtonOne from "../components/ButtonOne"
import InputLogInAndSignUp from "../components/InputLogInAndSignUp"
import ErrorText from "../components/ErrorText"

const SignUp: FC = () => {
  const [error, setError] = useState("")
  const [userExists, setUserExists] = useState(false)

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
      onSubmit={(values) => createUser(values, setUserExists, setError)}
    >
      {({ handleChange, handleSubmit, values, touched, errors }) => (
        <View style={styles.container}>
          <InputLogInAndSignUp
            dataType={values.user}
            placeholder="usuario"
            icon="user"
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
            icon="lock"
            secureTextEntry
            setDataType={handleChange("password")}
          />
          {touched.password && <ErrorText text={`${errors.password}`} />}
          <InputLogInAndSignUp
            dataType={values.email}
            placeholder="email"
            icon="mail"
            setDataType={handleChange("email")}
          />
          {touched.email && <ErrorText text={`${errors.email}`} />}
          <InputLogInAndSignUp
            dataType={values.emailVerification}
            placeholder="repetir email"
            icon="sync"
            setDataType={handleChange("emailVerification")}
          />
          {touched.emailVerification && (
            <ErrorText text={`${errors.emailVerification}`} />
          )}
          <InputLogInAndSignUp
            dataType={values.phone}
            placeholder="celular (opcional)"
            icon="mobile1"
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
})

export default SignUp
