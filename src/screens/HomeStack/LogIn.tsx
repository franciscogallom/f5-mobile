import React, { FC, useContext, useState } from "react"
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native"
import { Formik } from "formik"
import { useDispatch } from "react-redux"

import { colors } from "../../assets/colors"
import { handleLogIn } from "../../services/users/handleLogIn"
import { addUser } from "../../redux/actions"
import { saveItemInAsyncStorage } from "../../asyncStorage/saveItem"
import { LogInScreenNavigationProp } from "../../interfaces/props"

import ButtonOne from "../../components/ButtonOne"
import Input from "../../components/Input"
import ErrorText from "../../components/ErrorText"
import Action from "../../components/Action"
import Context from "../../context/context"

const LogIn: FC<LogInScreenNavigationProp> = ({
  navigation,
}: LogInScreenNavigationProp) => {
  const [logInStatus, setLogInStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { setToken } = useContext(Context)

  return (
    <Formik
      initialValues={{
        user: "",
        password: "",
      }}
      onSubmit={(values) => {
        setLoading(true)
        handleLogIn(values)
          .then(({ token }) => {
            setToken(token)
            Promise.all([
              saveItemInAsyncStorage("username", values.user),
              saveItemInAsyncStorage("token", token),
            ])
              .then(() => {
                dispatch(addUser(values.user))
              })
              .catch(() => {
                setLogInStatus("algo salió mal..")
              })
              .finally(() => {
                setLoading(false)
              })
          })
          .catch((e) => {
            setLogInStatus(e.response?.data.message || "algo salio mal..")
            setLoading(false)
          })
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <Input
                value={values.user}
                placeholder="usuario."
                icon="user"
                setValue={handleChange("user")}
              />
              <Input
                value={values.password}
                placeholder="contraseña."
                icon="lock"
                secureTextEntry
                setValue={handleChange("password")}
              />
              {logInStatus ? <ErrorText text={logInStatus} /> : null}
              <ButtonOne
                text="iniciar sesión"
                handleTap={handleSubmit}
                loading={loading}
              />
              <Action
                text="crear nueva cuenta"
                icon="adduser"
                handleTap={() => navigation.navigate("SignUp")}
              />
              <Action
                text="olvide mi contraseña"
                icon="question"
                handleTap={() => navigation.navigate("ForgotPassword")}
                secondary
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
