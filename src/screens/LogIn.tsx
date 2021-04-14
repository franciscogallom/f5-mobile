import React, { FC, useState } from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native"

import { Formik } from "formik"
import { useDispatch } from "react-redux"

import { colors } from "../../assets/colors"
import { handleLogIn } from "../services/handleLogIn"

import ButtonOne from "../components/ButtonOne"
import InputLogInAndSignUp from "../components/InputLogInAndSignUp"
import ErrorText from "../components/ErrorText"
import Action from "../components/Action"
import Loader from "../components/Loader"

export type RootStackParamList = {
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
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{
        user: "",
        password: "",
      }}
      onSubmit={(values) =>
        handleLogIn(values, dispatch, setLoader, setLogInStatus)
      }
    >
      {({ handleChange, handleSubmit, values }) => (
        <>
          {loader && <Loader />}
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

export default LogIn
