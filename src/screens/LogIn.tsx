import React, { FC, useState } from "react"
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native"

import { Formik } from "formik"
import { useDispatch } from "react-redux"

import { colors } from "../assets/colors"
import { handleLogIn } from "../services/handleLogIn"
import { addUser } from "../redux/actions"
import { storeData } from "../services/storeData"
import { LogInScreenNavigationProp } from "../interfaces/props"

import ButtonOne from "../components/ButtonOne"
import Input from "../components/Input"
import ErrorText from "../components/ErrorText"
import Action from "../components/Action"
import Loader from "../components/Loader"

const LogIn: FC<LogInScreenNavigationProp> = ({
  navigation,
}: LogInScreenNavigationProp) => {
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
        handleLogIn(values)
          .then(() => {
            setLoader(true)
            dispatch(addUser(values.user))
            storeData(values.user)
          })
          .catch((e) => {
            setLogInStatus(e.response.data.message || "algo salio mal..")
          })
          .finally(() => setLoader(false))
      }
    >
      {({ handleChange, handleSubmit, values }) => (
        <>
          {loader && <Loader />}
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <Input
                value={values.user}
                placeholder="usuario."
                icon="user"
                setDataType={handleChange("user")}
              />
              <Input
                value={values.password}
                placeholder="contraseña."
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
