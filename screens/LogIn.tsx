import React, { FC, useState } from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native"

import { Formik } from "formik"
import Axios from "axios"

import { colors } from "../assets/colors"

import ButtonOne from "../components/ButtonOne"
import InputLogInAndSignUp from "../components/InputLogInAndSignUp"
import ErrorText from "../components/ErrorText"
import Action from "../components/Action"

interface User {
  user: string
  password: string
}

type RootStackParamList = {
  LogIn: undefined
  SignUp: undefined
}

type LogInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LogIn"
>

type Props = {
  navigation: LogInScreenNavigationProp
}

const LogIn: FC<Props> = ({ navigation }: Props) => {
  const [logInStatus, setLogInStatus] = useState("")

  const handleLogIn = (values: User) => {
    Axios.post("http://10.0.2.2:3001/users/login", values).then((response) => {
      setLogInStatus(response.data.message || "successful login")
    })
  }

  return (
    <Formik
      initialValues={{
        user: "",
        password: "",
      }}
      onSubmit={(values) => handleLogIn(values)}
    >
      {({ handleChange, handleSubmit, values }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <InputLogInAndSignUp
              dataType={values.user}
              placeholder="usuario"
              icon="user"
              setDataType={handleChange("user")}
            />
            <InputLogInAndSignUp
              dataType={values.password}
              placeholder="contraseña"
              icon="lock"
              secureTextEntry
              setDataType={handleChange("password")}
            />
            {logInStatus ? <ErrorText text={logInStatus} /> : null}
            <ButtonOne text="iniciar sesión" handleTap={handleSubmit} />
            <Action
              text="crear nueva cuenta"
              icon="adduser"
              handleTap={() => navigation.navigate("SignUp")}
            />
          </View>
        </TouchableWithoutFeedback>
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

export default LogIn
