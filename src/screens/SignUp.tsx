import React, { FC, useState } from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"

import { Formik } from "formik"
import { useDispatch } from "react-redux"

import { colors } from "../assets/colors"

import { userSchema } from "../schemas/user"
import { createUser } from "../services/createUser"

import { RootStackParamList } from "./LogIn"

import ButtonOne from "../components/ButtonOne"
import InputLogInAndSignUp from "../components/InputLogInAndSignUp"
import ErrorText from "../components/ErrorText"
import GoBack from "../components/Action"
import Loader from "../components/Loader"

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>

type Props = {
  navigation: SignUpScreenNavigationProp
}

const SignUp: FC<Props> = ({ navigation }: Props) => {
  const [error, setError] = useState("")
  const [loader, setLoader] = useState(false)
  const [userExists, setUserExists] = useState(false)

  const dispatch = useDispatch()

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
      onSubmit={(values) =>
        createUser(values, dispatch, setUserExists, setError, setLoader)
      }
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        touched,
        errors,
      }) => (
        <>
          {loader && <Loader />}
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <InputLogInAndSignUp
                dataType={values.user}
                placeholder="usuario"
                icon="user"
                setDataType={handleChange("user")}
                onBlur={values.user ? handleBlur("user") : undefined}
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
                onBlur={values.password ? handleBlur("password") : undefined}
              />
              {touched.password && <ErrorText text={`${errors.password}`} />}
              <InputLogInAndSignUp
                dataType={values.email}
                placeholder="email"
                icon="mail"
                setDataType={handleChange("email")}
                onBlur={values.email ? handleBlur("email") : undefined}
                keyboardType="email-address"
              />
              {touched.email && <ErrorText text={`${errors.email}`} />}
              <InputLogInAndSignUp
                dataType={values.emailVerification}
                placeholder="repetir email"
                icon="sync"
                setDataType={handleChange("emailVerification")}
                onBlur={
                  values.emailVerification
                    ? handleBlur("emailVerification")
                    : undefined
                }
                keyboardType="email-address"
              />
              {touched.emailVerification && (
                <ErrorText text={`${errors.emailVerification}`} />
              )}
              <InputLogInAndSignUp
                dataType={values.phone}
                placeholder="celular (opcional)"
                icon="mobile1"
                setDataType={handleChange("phone")}
                onBlur={values.phone ? handleBlur("phone") : undefined}
                keyboardType="numeric"
              />
              {touched.phone && <ErrorText text={`${errors.phone}`} />}
              {error !== "" && !userExists && <ErrorText text={`${error}`} />}
              <ButtonOne text="crear cuenta" handleTap={handleSubmit} />
              <GoBack
                icon="back"
                text="volver atrás"
                handleTap={() => navigation.goBack()}
              />
            </View>
          </TouchableWithoutFeedback>
        </>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
})

export default SignUp
